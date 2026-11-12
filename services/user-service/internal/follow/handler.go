package follow

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
	mux.HandleFunc("POST /follow", h.Follow)
	mux.HandleFunc("GET /followers/{id}", h.GetFollowers)
	mux.HandleFunc("GET /following/{id}", h.GetFollowing)
	mux.HandleFunc("POST /unfollow", h.Unfollow)
}

func (h *Handler) Follow(w http.ResponseWriter, r *http.Request) {
	var in FollowInput
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&in); err != nil {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	f, err := h.svc.Follow(r.Context(), in)
	if err != nil {
		jsonutil.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}
	jsonutil.WriteJSON(w, http.StatusCreated, f)
}

func (h *Handler) GetFollowers(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/followers/"):]
	followers, err := h.svc.GetFollowers(r.Context(), id)
	if err != nil {
		jsonutil.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, followers)
}

func (h *Handler) GetFollowing(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/following/"):]
	following, err := h.svc.GetFollowing(r.Context(), id)
	if err != nil {
		jsonutil.WriteError(w, http.StatusInternalServerError, err.Error())
		return
	}
	jsonutil.WriteJSON(w, http.StatusOK, following)
}

func (h *Handler) Unfollow(w http.ResponseWriter, r *http.Request) {
	var in FollowInput
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&in); err != nil {
		jsonutil.WriteError(w, http.StatusBadRequest, "invalid JSON body")
		return
	}
	err := h.svc.Unfollow(r.Context(), in)
	if err != nil {
		if errors.Is(err, ErrNotFound) {
			jsonutil.WriteError(w, http.StatusNotFound, "follow relationship not found")
		} else {
			jsonutil.WriteError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}
	jsonutil.WriteJSON(w, http.StatusNoContent, nil)
}