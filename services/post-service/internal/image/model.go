package image

import "time"

type Image struct {
	ID        string    `json:"id"`
	PostID    string    `json:"post_id"`
	URL       string    `json:"url"`
	CreatedAt time.Time `json:"created_at"`
}

type Input struct {
	URL string `json:"url"`
}
