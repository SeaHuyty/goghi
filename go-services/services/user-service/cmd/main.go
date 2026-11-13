package main

import (
	"fmt"
	"log"
	"net/http"

	database "github.com/SeaHuyty/goghi/services/user-service/internal/database"
	"github.com/SeaHuyty/goghi/services/user-service/internal/follow"
	"github.com/SeaHuyty/goghi/services/user-service/internal/user"
)

func main() {
	db, err := database.ConnectToDatabase()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("User Service is up!"))
	})
	user.RegisterRoutes(mux, user.NewHandler(user.NewService(db)))
	follow.RegisterRoutes(mux, follow.NewHandler(follow.NewService(db)))

	fmt.Println("User Service is running on port 8082...")
	if err := http.ListenAndServe(":8082", mux); err != nil {
		log.Fatal(err)
	}
}
