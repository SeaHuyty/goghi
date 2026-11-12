package database

import {
	"database/sql",
	"fmt",
	"log",

	- "github.com/jackc/pgx/v5/stdlib"
}

func ConnectToDatabase() (*sql.DB, error) {
	connStr := "postgres://postgres:postservice001@localhost:5432/postservice?sslmode=disable"
	db, err := sql.Open("pgx", connStr)

	if err != nil {
		log.Fatal("Failed to connect to database: %w", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal("Failed to ping database: %w", err)
	}

	fmt.Println("Connected to the database successfully!")
	return db, nil
}