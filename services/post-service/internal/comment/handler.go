package comment

import (
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
	mux.HandleFunc("POST /post/{id}/comments", h.Add)
	mux.HandleFunc("GET /post/{id}/comments", h.List)
	mux.HandleFunc("DELETE /comments/{id}", h.Delete)
}

func (h *Handler) Add(w http.ResponseWriter, r *http.Request) {
	var in Input
	if !common.Decode(w, r, &in) {
		return
	}
	c, err := h.svc.Add(r.Context(), r.PathValue("id"), in)
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusCreated, c)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	page, ok := common.PageParam(w, r)
	if !ok {
		return
	}
	comments, err := h.svc.List(r.Context(), r.PathValue("id"), page)
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, comments)
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	if err := h.svc.Delete(r.Context(), r.PathValue("id")); err != nil {
		common.WriteServiceError(w, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
