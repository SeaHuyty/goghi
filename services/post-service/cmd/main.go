package main

import (
    "fmt"
    "net/http"
    database "github.com/SeaHuyty/goghi/services/post-service/internal/database"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Post Service is up!"))
    })

    http.HandleFunc("/database", func(w http.ResponseWriter, r *http.Request) {
        database.ConnectToDatabase()
    })

    fmt.Println("Post Service is running on port 8081...")
    if err := http.ListenAndServe(":8081", nil); err != nil {
        panic(err)
    }
}