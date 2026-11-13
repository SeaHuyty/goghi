package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/SeaHuyty/goghi/services/post-service/internal/comment"
	"github.com/SeaHuyty/goghi/services/post-service/internal/database"
	"github.com/SeaHuyty/goghi/services/post-service/internal/image"
	"github.com/SeaHuyty/goghi/services/post-service/internal/like"
	"github.com/SeaHuyty/goghi/services/post-service/internal/post"
)

func main() {
	db, err := database.ConnectToDatabase()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Post Service is up!"))
	})
	post.RegisterRoutes(mux, post.NewHandler(post.NewService(db)))
	comment.RegisterRoutes(mux, comment.NewHandler(comment.NewService(db)))
	like.RegisterRoutes(mux, like.NewHandler(like.NewService(db)))
	image.RegisterRoutes(mux, image.NewHandler(image.NewService(db)))

	fmt.Println("Post Service is running on port 8081...")
	if err := http.ListenAndServe(":8081", mux); err != nil {
		log.Fatal(err)
	}
}
