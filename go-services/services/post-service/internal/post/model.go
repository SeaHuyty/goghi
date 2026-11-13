package post

import (
	"time"

	"github.com/SeaHuyty/goghi/services/post-service/internal/image"
)

type Post struct {
	ID           string        `json:"id"`
	Caption      string        `json:"caption"`
	UserID       string        `json:"user_id"`
	Images       []image.Image `json:"images"`
	LikeCount    int           `json:"like_count"`
	CommentCount int           `json:"comment_count"`
	CreatedAt    time.Time     `json:"created_at"`
	UpdatedAt    time.Time     `json:"updated_at"`
}

type Input struct {
	Caption string        `json:"caption"`
	UserID  string        `json:"user_id"`
	Images  []image.Input `json:"images"`
}
