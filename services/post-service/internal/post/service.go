package post

import (
	"context"
	"database/sql"
	"strings"

	"github.com/SeaHuyty/goghi/services/post-service/internal/common"
	"github.com/SeaHuyty/goghi/services/post-service/internal/image"
)

const (
	pageSize   = 30
	maxCaption = 5000
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

// Like/comment counts are computed from the likes and comments tables (same database).
const postSelect = `SELECT p.id, p.caption, p.user_id, p.created_at, p.updated_at,
	(SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id),
	(SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id)
	FROM posts p`

func (s *Service) query(ctx context.Context, query string, args ...any) ([]*Post, error) {
	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	posts := []*Post{}
	ids := []string{}
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Caption, &p.UserID, &p.CreatedAt, &p.UpdatedAt, &p.LikeCount, &p.CommentCount); err != nil {
			return nil, err
		}
		posts = append(posts, &p)
		ids = append(ids, p.ID)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	imgs, err := image.ForPosts(ctx, s.db, ids)
	if err != nil {
		return nil, err
	}
	for _, p := range posts {
		p.Images = imgs[p.ID]
		if p.Images == nil {
			p.Images = []image.Image{}
		}
	}
	return posts, nil
}

func (s *Service) Create(ctx context.Context, in Input) (*Post, error) {
	in.Caption = strings.TrimSpace(in.Caption)
	in.UserID = strings.TrimSpace(in.UserID)
	if in.Caption == "" || len(in.Caption) > maxCaption || !common.ValidUUID(in.UserID) {
		return nil, common.ErrInvalidInput
	}
	if err := image.ValidateAll(in.Images); err != nil {
		return nil, err
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	var p Post
	err = tx.QueryRowContext(ctx,
		`INSERT INTO posts (caption, user_id) VALUES ($1, $2)
		 RETURNING id, caption, user_id, created_at, updated_at`,
		in.Caption, in.UserID,
	).Scan(&p.ID, &p.Caption, &p.UserID, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		return nil, err
	}
	if p.Images, err = image.InsertTx(ctx, tx, p.ID, in.Images); err != nil {
		return nil, err
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}
	return &p, nil
}

func (s *Service) Get(ctx context.Context, id string) (*Post, error) {
	if !common.ValidUUID(id) {
		return nil, common.ErrNotFound
	}
	posts, err := s.query(ctx, postSelect+` WHERE p.id = $1`, id)
	if err != nil {
		return nil, err
	}
	if len(posts) == 0 {
		return nil, common.ErrNotFound
	}
	return posts[0], nil
}

func (s *Service) ListByUser(ctx context.Context, userID string, page int) ([]*Post, error) {
	if !common.ValidUUID(userID) {
		return nil, common.ErrInvalidInput
	}
	return s.query(ctx,
		postSelect+` WHERE p.user_id = $1 ORDER BY p.created_at DESC LIMIT $2 OFFSET $3`,
		userID, pageSize, common.Offset(page, pageSize))
}

func (s *Service) List(ctx context.Context, page int) ([]*Post, error) {
	return s.query(ctx,
		postSelect+` ORDER BY p.created_at DESC LIMIT $1 OFFSET $2`,
		pageSize, common.Offset(page, pageSize))
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return common.DeleteByID(ctx, s.db, `DELETE FROM posts WHERE id = $1`, id)
}
