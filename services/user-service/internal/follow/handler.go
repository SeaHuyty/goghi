package follow

import (
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
	mux.HandleFunc("POST /follow", h.Follow)
	mux.HandleFunc("GET /followers", h.GetFollowers)
	mux.HandleFunc("GET /following", h.GetFollowing)
	mux.HandleFunc("POST /unfollow", h.Unfollow)
}

func (h *Handler) Follow(w http.ResponseWriter, r *http.Request) {

}

func (h *Handler) GetFollowers(w *http.ServeMux, r *http.Request) {

}

func (h *Handler) GetFollowing(w *http.ServeMux, r *http.Request) {

}

func (h *Handler) Unfollow(w *http.ServeMux, r *http.Request) {

}