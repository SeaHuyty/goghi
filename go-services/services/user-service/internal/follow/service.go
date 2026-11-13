package follow

import (
	"context"
	"database/sql"
	"strings"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) Follow(ctx context.Context, in FollowInput) (*Follower, error) {
	in.UserID = strings.TrimSpace(in.UserID)
	in.FollowerID = strings.TrimSpace(in.FollowerID)
	if in.UserID == "" || in.FollowerID == "" {
		return nil, ErrInvalidInput
	}
	var f Follower
	err := s.db.QueryRowContext(ctx,
		`INSERT INTO followers (user_id, follower_id)
		 VALUES ($1, $2)
		 RETURNING id, user_id, follower_id, created_at`,
		in.UserID, in.FollowerID,
	).Scan(&f.ID, &f.UserID, &f.FollowerID, &f.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &f, nil
}

func (s *Service) Unfollow(ctx context.Context, in FollowInput) error {
	in.UserID = strings.TrimSpace(in.UserID)
	in.FollowerID = strings.TrimSpace(in.FollowerID)
	if in.UserID == "" || in.FollowerID == "" {
		return ErrInvalidInput
	}
	res, err := s.db.ExecContext(ctx, `
		DELETE FROM followers WHERE user_id = $1 AND follower_id = $2`, 
		in.UserID, in.FollowerID,
	)
	if err != nil {
		return err
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return ErrNotFound
	}
	return nil
}

func (s *Service) GetFollowers(ctx context.Context, userID string) ([]Follower, error) {
	var followers []Follower
	rows, err := s.db.QueryContext(ctx,
		`SELECT followers.id, user_id, follower_id, followers.created_at, u.name, COALESCE(u.image_url, '')
		 FROM followers JOIN users u ON followers.follower_id = u.id
		 WHERE user_id = $1`, userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var f Follower
		if err := rows.Scan(&f.ID, &f.UserID, &f.FollowerID, &f.CreatedAt, &f.Name, &f.ImageURL); err != nil {
			return nil, err
		}
		followers = append(followers, f)
	}
	return followers, nil
}

func (s *Service) GetFollowing(ctx context.Context, followerID string) ([]Follower, error) {
	var followers []Follower
	rows, err := s.db.QueryContext(ctx,
		`SELECT followers.id, user_id, follower_id, followers.created_at, u.name, COALESCE(u.image_url, '')
		 FROM followers JOIN users u ON followers.user_id = u.id
		 WHERE follower_id = $1`, followerID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var f Follower
		if err := rows.Scan(&f.ID, &f.UserID, &f.FollowerID, &f.CreatedAt, &f.Name, &f.ImageURL); err != nil {
			return nil, err
		}
		followers = append(followers, f)
	}
	return followers, nil
}