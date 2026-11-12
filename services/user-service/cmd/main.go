package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("User Service is up!"))
    })

    fmt.Println("User Service is running on port 8082...")
    if err := http.ListenAndServe(":8082", nil); err != nil {
        panic(err)
    }
}