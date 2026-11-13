package like

import (
	"errors"
	"time"
)

var ErrAlreadyLiked = errors.New("post already liked by this user")

type Like struct {
	ID        string    `json:"id"`
	PostID    string    `json:"post_id"`
	UserID    string    `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Input struct {
	UserID string `json:"user_id"`
}
