package user

import (
	"errors"
	"time"
)

var (
	ErrNotFound     = errors.New("user not found")
	ErrInvalidInput = errors.New("name, email and password are required")
	ErrEmailTaken   = errors.New("email already in use")
)

type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Bio       string    `json:"bio"`
	Email     string    `json:"email"`
	Password  string    `json:"-"` // never serialized
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateInput struct {
	Name     string `json:"name"`
	Bio      string `json:"bio"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
