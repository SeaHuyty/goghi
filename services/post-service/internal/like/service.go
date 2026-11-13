package like

import (
	"context"
	"database/sql"
	"errors"
	"strings"

	"github.com/SeaHuyty/goghi/services/post-service/internal/common"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) Like(ctx context.Context, postID string, in Input) (*Like, error) {
	in.UserID = strings.TrimSpace(in.UserID)
	if !common.ValidUUID(in.UserID) {
		return nil, common.ErrInvalidInput
	}
	if !common.ValidUUID(postID) {
		return nil, common.ErrNotFound
	}

	var l Like
	err := s.db.QueryRowContext(ctx,
		`INSERT INTO likes (post_id, user_id) VALUES ($1, $2)
		 ON CONFLICT (post_id, user_id) DO NOTHING
		 RETURNING id, post_id, user_id, created_at`,
		postID, in.UserID,
	).Scan(&l.ID, &l.PostID, &l.UserID, &l.CreatedAt)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, ErrAlreadyLiked
	}
	if err != nil {
		if common.IsFKViolation(err) {
			return nil, common.ErrNotFound
		}
		return nil, err
	}
	return &l, nil
}

func (s *Service) Unlike(ctx context.Context, postID string, in Input) error {
	in.UserID = strings.TrimSpace(in.UserID)
	if !common.ValidUUID(in.UserID) {
		return common.ErrInvalidInput
	}
	if !common.ValidUUID(postID) {
		return common.ErrNotFound
	}
	res, err := s.db.ExecContext(ctx,
		`DELETE FROM likes WHERE post_id = $1 AND user_id = $2`, postID, in.UserID)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return common.ErrNotFound
	}
	return nil
}

func (s *Service) List(ctx context.Context, postID string) ([]*Like, error) {
	if !common.ValidUUID(postID) {
		return nil, common.ErrNotFound
	}
	rows, err := s.db.QueryContext(ctx,
		`SELECT id, post_id, user_id, created_at FROM likes
		 WHERE post_id = $1 ORDER BY created_at DESC`, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	likes := []*Like{}
	for rows.Next() {
		var l Like
		if err := rows.Scan(&l.ID, &l.PostID, &l.UserID, &l.CreatedAt); err != nil {
			return nil, err
		}
		likes = append(likes, &l)
	}
	return likes, rows.Err()
}
