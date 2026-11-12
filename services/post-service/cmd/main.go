package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Post Service is up!"))
    })

    fmt.Println("Post Service is running on port 8081...")
    if err := http.ListenAndServe(":8081", nil); err != nil {
        panic(err)
    }
}