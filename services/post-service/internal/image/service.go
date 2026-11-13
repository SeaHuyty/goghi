package image

import (
	"context"
	"database/sql"
	"errors"
	"net/url"
	"strings"

	"github.com/SeaHuyty/goghi/services/post-service/internal/common"
)

const MaxPerPost = 10

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func validURL(raw string) bool {
	u, err := url.ParseRequestURI(raw)
	return err == nil && (u.Scheme == "http" || u.Scheme == "https") && u.Host != ""
}

func ValidateAll(in []Input) error {
	if len(in) > MaxPerPost {
		return common.ErrInvalidInput
	}
	for i := range in {
		in[i].URL = strings.TrimSpace(in[i].URL)
		if !validURL(in[i].URL) {
			return common.ErrInvalidInput
		}
	}
	return nil
}

// InsertTx inserts images for a post inside an existing transaction.
func InsertTx(ctx context.Context, tx *sql.Tx, postID string, in []Input) ([]Image, error) {
	images := make([]Image, 0, len(in))
	for _, im := range in {
		var img Image
		err := tx.QueryRowContext(ctx,
			`INSERT INTO post_images (post_id, image_url) VALUES ($1, $2)
			 RETURNING id, post_id, image_url, created_at`,
			postID, im.URL,
		).Scan(&img.ID, &img.PostID, &img.URL, &img.CreatedAt)
		if err != nil {
			return nil, err
		}
		images = append(images, img)
	}
	return images, nil
}

func ForPosts(ctx context.Context, db *sql.DB, postIDs []string) (map[string][]Image, error) {
	out := make(map[string][]Image, len(postIDs))
	if len(postIDs) == 0 {
		return out, nil
	}
	rows, err := db.QueryContext(ctx,
		`SELECT id, post_id, image_url, created_at FROM post_images
		 WHERE post_id::text = ANY($1) ORDER BY created_at, id`, postIDs)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var img Image
		if err := rows.Scan(&img.ID, &img.PostID, &img.URL, &img.CreatedAt); err != nil {
			return nil, err
		}
		out[img.PostID] = append(out[img.PostID], img)
	}
	return out, rows.Err()
}

func (s *Service) Add(ctx context.Context, postID string, in Input) (*Image, error) {
	in.URL = strings.TrimSpace(in.URL)
	if !validURL(in.URL) {
		return nil, common.ErrInvalidInput
	}
	if !common.ValidUUID(postID) {
		return nil, common.ErrNotFound
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	// Lock the post row so concurrent adds can't exceed the image limit.
	var lockedID string
	if err := tx.QueryRowContext(ctx, `SELECT id FROM posts WHERE id = $1 FOR UPDATE`, postID).Scan(&lockedID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, common.ErrNotFound
		}
		return nil, err
	}
	var count int
	if err := tx.QueryRowContext(ctx, `SELECT COUNT(*) FROM post_images WHERE post_id = $1`, postID).Scan(&count); err != nil {
		return nil, err
	}
	if count >= MaxPerPost {
		return nil, common.ErrInvalidInput
	}

	imgs, err := InsertTx(ctx, tx, postID, []Input{in})
	if err != nil {
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	return &imgs[0], nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return common.DeleteByID(ctx, s.db, `DELETE FROM post_images WHERE id = $1`, id)
}
