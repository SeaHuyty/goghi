package user

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/SeaHuyty/goghi/services/user-service/internal/jsonutil"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func RegisterRoutes(mux *http.ServeMux, h *Handler) {
	mux.HandleFunc("POST /users", h.Create)
	mux.HandleFunc("GET /users/{id}", h.Get)
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var in CreateInput
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&in); err != nil {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	u, err := h.svc.Create(r.Context(), in)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusCreated, u)
}

func writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidInput):
		jsonutil.WriteError(w, http.StatusBadRequest, err.Error())
	case errors.Is(err, ErrEmailTaken):
		jsonutil.WriteError(w, http.StatusConflict, err.Error())
	case errors.Is(err, ErrNotFound):
		jsonutil.WriteError(w, http.StatusNotFound, err.Error())
	default:
		jsonutil.WriteError(w, http.StatusInternalServerError, "internal server error")
	}
}
