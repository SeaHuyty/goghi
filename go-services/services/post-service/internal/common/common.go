package common

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"regexp"
	"strconv"

	"github.com/SeaHuyty/goghi/services/post-service/internal/jsonutil"
	"github.com/jackc/pgx/v5/pgconn"
)

var (
	ErrNotFound     = errors.New("not found")
	ErrInvalidInput = errors.New("invalid input")
)

var uuidRe = regexp.MustCompile(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`)

func ValidUUID(id string) bool { return uuidRe.MatchString(id) }

// IsFKViolation reports whether err is a Postgres foreign key violation
// (e.g. commenting on a post that does not exist).
func IsFKViolation(err error) bool {
	var pgErr *pgconn.PgError
	return errors.As(err, &pgErr) && pgErr.Code == "23503"
}

// Offset converts a 0-based page into a row offset.
func Offset(page, size int) int {
	if page < 0 {
		page = 0
	}
	return page * size
}

// DeleteByID runs a "DELETE ... WHERE id = $1" query and returns ErrNotFound if nothing was deleted.
func DeleteByID(ctx context.Context, db *sql.DB, query, id string) error {
	if !ValidUUID(id) {
		return ErrNotFound
	}
	res, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return ErrNotFound
	}
	return nil
}

// Decode reads a JSON body (max 1MB) into v, writing a 400 on failure.
func Decode(w http.ResponseWriter, r *http.Request, v any) bool {
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(v); err != nil {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid JSON body")
		return false
	}
	return true
}

// PageParam reads the optional ?page= query parameter (0-based, default 0).
func PageParam(w http.ResponseWriter, r *http.Request) (int, bool) {
	raw := r.URL.Query().Get("page")
	if raw == "" {
		return 0, true
	}
	page, err := strconv.Atoi(raw)
	if err != nil || page < 0 {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid page parameter")
		return 0, false
	}
	return page, true
}

// WriteServiceError maps shared errors to HTTP responses; anything else is a generic 500.
func WriteServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidInput):
		jsonutil.WriteError(w, http.StatusBadRequest, err.Error())
	case errors.Is(err, ErrNotFound):
		jsonutil.WriteError(w, http.StatusNotFound, err.Error())
	default:
		jsonutil.WriteError(w, http.StatusInternalServerError, "internal server error")
	}
}
