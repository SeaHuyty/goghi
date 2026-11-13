package like

import (
	"errors"
	"net/http"

	"github.com/SeaHuyty/goghi/services/post-service/internal/common"
	"github.com/SeaHuyty/goghi/services/post-service/internal/jsonutil"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

func RegisterRoutes(mux *http.ServeMux, h *Handler) {
	mux.HandleFunc("POST /post/{id}/likes", h.Like)
	mux.HandleFunc("DELETE /post/{id}/likes", h.Unlike)
	mux.HandleFunc("GET /post/{id}/likes", h.List)
}

func writeError(w http.ResponseWriter, err error) {
	if errors.Is(err, ErrAlreadyLiked) {
		jsonutil.WriteError(w, http.StatusConflict, err.Error())
		return
	}
	common.WriteServiceError(w, err)
}

func (h *Handler) Like(w http.ResponseWriter, r *http.Request) {
	var in Input
	if !common.Decode(w, r, &in) {
		return
	}
	l, err := h.svc.Like(r.Context(), r.PathValue("id"), in)
	if err != nil {
		writeError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusCreated, l)
}

func (h *Handler) Unlike(w http.ResponseWriter, r *http.Request) {
	var in Input
	if !common.Decode(w, r, &in) {
		return
	}
	if err := h.svc.Unlike(r.Context(), r.PathValue("id"), in); err != nil {
		writeError(w, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	likes, err := h.svc.List(r.Context(), r.PathValue("id"))
	if err != nil {
		writeError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, likes)
}
