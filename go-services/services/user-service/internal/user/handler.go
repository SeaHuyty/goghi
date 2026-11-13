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
	mux.HandleFunc("PUT /users/{id}", h.Update)
	mux.HandleFunc("DELETE /users/{id}", h.Delete)
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var in UserInput
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

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/users/"):]
	u, err := h.svc.Get(r.Context(), id)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, u)
}

func (h *Handler) Update(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/users/"):]
	var in UserInput
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&in); err != nil {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	u, err := h.svc.Update(r.Context(), id, in)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, u)
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/users/"):]
	err := h.svc.Delete(r.Context(), id)
	if err != nil {
		writeServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusNoContent, nil)
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
