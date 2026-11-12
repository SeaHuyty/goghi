package follow

import (
	"errors"
	"time"
)

var (
	ErrNotFound = errors.New("follow relationship not found")
)

type Follower struct {
	ID         string    `json:"id"`
	UserID     string    `json:"user_id"`
	FollowerID string    `json:"follower_id"`
	CreatedAt  time.Time `json:"created_at"`
}

type FollowInput struct {
	UserID     string `json:"user_id"`			// The ID of the user who is being followed
	FollowerID string `json:"follower_id"`		// The ID of the user who is following
}