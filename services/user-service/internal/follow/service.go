package follow

import (
	"database/sql"
	"errors"
	"strings"
)

type Service struct {
	db *sql.DB
}