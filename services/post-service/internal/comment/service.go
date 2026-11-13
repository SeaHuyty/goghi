package comment

import (
	"context"
	"database/sql"
	"strings"

	"github.com/SeaHuyty/goghi/services/post-service/internal/common"
)

const (
	pageSize   = 50
	maxContent = 2000
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) Add(ctx context.Context, postID string, in Input) (*Comment, error) {
	in.UserID = strings.TrimSpace(in.UserID)
	in.Content = strings.TrimSpace(in.Content)
	if !common.ValidUUID(in.UserID) || in.Content == "" || len(in.Content) > maxContent {
		return nil, common.ErrInvalidInput
	}
	if !common.ValidUUID(postID) {
		return nil, common.ErrNotFound
	}

	var c Comment
	err := s.db.QueryRowContext(ctx,
		`INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3)
		 RETURNING id, post_id, user_id, content, created_at`,
		postID, in.UserID, in.Content,
	).Scan(&c.ID, &c.PostID, &c.UserID, &c.Content, &c.CreatedAt)
	if err != nil {
		if common.IsFKViolation(err) {
			return nil, common.ErrNotFound
		}
		return nil, err
	}
	return &c, nil
}

func (s *Service) List(ctx context.Context, postID string, page int) ([]*Comment, error) {
	if !common.ValidUUID(postID) {
		return nil, common.ErrNotFound
	}
	rows, err := s.db.QueryContext(ctx,
		`SELECT id, post_id, user_id, content, created_at FROM comments
		 WHERE post_id = $1 ORDER BY created_at, id LIMIT $2 OFFSET $3`,
		postID, pageSize, common.Offset(page, pageSize))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	comments := []*Comment{}
	for rows.Next() {
		var c Comment
		if err := rows.Scan(&c.ID, &c.PostID, &c.UserID, &c.Content, &c.CreatedAt); err != nil {
			return nil, err
		}
		comments = append(comments, &c)
	}
	return comments, rows.Err()
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return common.DeleteByID(ctx, s.db, `DELETE FROM comments WHERE id = $1`, id)
}
