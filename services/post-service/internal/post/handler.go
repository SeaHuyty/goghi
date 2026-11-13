package post

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
	mux.HandleFunc("POST /post", h.Create)
	mux.HandleFunc("GET /post/{id}", h.Get)
	mux.HandleFunc("DELETE /post/{id}", h.Delete)
	mux.HandleFunc("GET /posts", h.List)
	mux.HandleFunc("GET /posts/{id}", h.ListByUser) // posts by user id
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	var in Input
	if !common.Decode(w, r, &in) {
		return
	}
	p, err := h.svc.Create(r.Context(), in)
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusCreated, p)
}

func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	p, err := h.svc.Get(r.Context(), r.PathValue("id"))
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, p)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	page, ok := common.PageParam(w, r)
	if !ok {
		return
	}
	posts, err := h.svc.List(r.Context(), page)
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, posts)
}

func (h *Handler) ListByUser(w http.ResponseWriter, r *http.Request) {
	page, ok := common.PageParam(w, r)
	if !ok {
		return
	}
	posts, err := h.svc.ListByUser(r.Context(), r.PathValue("id"), page)
	if err != nil {
		common.WriteServiceError(w, err)
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, posts)
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	if err := h.svc.Delete(r.Context(), r.PathValue("id")); err != nil {
		common.WriteServiceError(w, err)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
