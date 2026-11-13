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

func (s *Service) Create(ctx context.Context, in UserInput) (*User, error) {
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

func (s *Service) Get(ctx context.Context, id string) (*User, error) {
	var u User
	err := s.db.QueryRowContext(ctx,
		`SELECT  id, name, COALESCE(bio, ''), email, created_at, updated_at
		 FROM users WHERE id = $1`, id,
		).Scan(&u.ID, &u.Name, &u.Bio, &u.Email, &u.CreatedAt, &u.UpdatedAt)
	
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &u, nil
}

func (s *Service) Update(ctx context.Context, id string, in UserInput) (*User, error) {
	var u User
	err := s.db.QueryRowContext(ctx,
		`UPDATE users SET name = $1, bio = $2, email = $3, password = $4, updated_at = CURRENT_TIMESTAMP
		 WHERE id = $5
		 RETURNING id, name, COALESCE(bio, ''), email, created_at, updated_at`,
		in.Name, in.Bio, in.Email, in.Password, id,
	).Scan(&u.ID, &u.Name, &u.Bio, &u.Email, &u.CreatedAt, &u.UpdatedAt)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &u, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	result, err := s.db.ExecContext(ctx, `DELETE FROM users WHERE id = $1`, id)
	if err != nil {
		return err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return ErrNotFound
	}
	return nil
}