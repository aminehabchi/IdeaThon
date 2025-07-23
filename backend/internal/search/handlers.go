package search

import (
	"encoding/json"
	"ideaThon/config"
	"log"
	"net/http"
)

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "Query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	db := config.DATABASE
	repo := NewRepository(db)
	service := NewService(repo)

	result, err := service.Search(query)
	if err != nil {
		log.Printf("Search failed for query '%s': %v", query, err)
		http.Error(w, "Search failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		log.Printf("Failed to encode response: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

}

// // Handler struct to hold dependencies
// type Handler struct {
// 	service *Service
// }

// // NewHandler creates a new handler with dependencies
// func NewHandler(service *Service) *Handler {
// 	return &Handler{
// 		service: service,
// 	}
// }

// func (h *Handler) SearchHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodGet {
// 		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	query := r.URL.Query().Get("q")
// 	if query == "" {
// 		http.Error(w, "Query parameter 'q' is required", http.StatusBadRequest)
// 		return
// 	}

// 	result, err := h.service.Search(query)
// 	fmt.Println("result", result)
// 	if err != nil {
// 		log.Printf("Search failed for query '%s': %v", query, err)
// 		http.Error(w, "Search failed", http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	if err := json.NewEncoder(w).Encode(result); err != nil {
// 		log.Printf("Failed to encode response: %v", err)
// 		http.Error(w, "Internal server error", http.StatusInternalServerError)
// 		return
// 	}
// }
