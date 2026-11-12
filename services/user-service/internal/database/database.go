package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func ConnectToDatabase() (*sql.DB, error) {
	connStr := "postgres://postgres:userservice001@localhost:5432/userservice?sslmode=disable"
	db, err := sql.Open("pgx", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	fmt.Println("Connected to the database successfully!")
	return db, nil
}