package user

import (
	"context"
	"database/sql"
	"errors"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) Create(ctx context.Context, in CreateInput) (*User, error) {
	in.Name = strings.TrimSpace(in.Name)
	in.Email = strings.ToLower(strings.TrimSpace(in.Email))
	if in.Name == "" || in.Email == "" || in.Password == "" {
		return nil, ErrInvalidInput
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	var u User
	err = s.db.QueryRowContext(ctx,
		`INSERT INTO users (name, bio, email, password)
		 VALUES ($1, $2, $3, $4)
		 RETURNING id, name, COALESCE(bio, ''), email, created_at, updated_at`,
		in.Name, in.Bio, in.Email, string(hash),
	).Scan(&u.ID, &u.Name, &u.Bio, &u.Email, &u.CreatedAt, &u.UpdatedAt)
	if err != nil {
		if strings.Contains(err.Error(), "SQLSTATE 23505") {
			return nil, ErrEmailTaken
		}
		return nil, err
	}
	return &u, nil
}