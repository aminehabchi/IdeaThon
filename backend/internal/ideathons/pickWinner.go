package ideathons

import (
	"database/sql"
	"encoding/json"
	"ideaThon/config"
	"ideaThon/internal/notifications"
	"ideaThon/utils"
	"net/http"
)

type PickWinnerRequest struct {
	IdeathonID int `json:"ideathon_id"`
	WinnerID   int `json:"winner_id"`
}

type PickWinnerResponse struct {
	Message    string `json:"message"`
	IdeathonID int    `json:"ideathon_id"`
	WinnerID   int    `json:"winner_id"`
}

func PickWinner(w http.ResponseWriter, r *http.Request) {
	userID, err := utils.Get_id_from_session(r.Header.Get("token"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	var req PickWinnerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Step 4: Verify that the user is the ideathon owner and that no winner has been set yet
	var ownerID, winnerID int
	err = config.DATABASE.QueryRow("SELECT user_id, winner_id FROM ideathons WHERE id = ?", req.IdeathonID).Scan(&ownerID, &winnerID)
	if err == sql.ErrNoRows {
		http.Error(w, "Ideathon not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if userID != ownerID {
		http.Error(w, "Forbidden: only the ideathon creator can pick a winner", http.StatusForbidden)
		return
	}

	if winnerID != 0 {
		http.Error(w, "Winner has already been selected", http.StatusBadRequest)
		return
	}

	var exists int
	err = config.DATABASE.QueryRow(
		"SELECT 1 FROM entries WHERE ideathon_id = ? AND user_id = ? LIMIT 1",
		req.IdeathonID, req.WinnerID,
	).Scan(&exists)
	if err == sql.ErrNoRows {
		http.Error(w, "Selected winner did not participate in this ideathon", http.StatusBadRequest)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Start a transaction to update both ideathons and entries tables
	tx, err := config.DATABASE.Begin()
	if err != nil {
		http.Error(w, "Failed to start transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	// Update the ideathon with the winner_id
	_, err = tx.Exec(
		"UPDATE ideathons SET winner_id = ? WHERE id = ?",
		req.WinnerID, req.IdeathonID,
	)
	if err != nil {
		http.Error(w, "Failed to update winner", http.StatusInternalServerError)
		return
	}

	// Update the winning entry's is_win field
	_, err = tx.Exec(
		"UPDATE entries SET is_win = 1 WHERE ideathon_id = ? AND user_id = ?",
		req.IdeathonID, req.WinnerID,
	)
	if err != nil {
		http.Error(w, "Failed to update winning entry", http.StatusInternalServerError)
		return
	}

	// Commit the transaction
	if err = tx.Commit(); err != nil {
		http.Error(w, "Failed to commit transaction", http.StatusInternalServerError)
		return
	}

	// Get ideathon description for notification
	var ideathonDescription string
	err = config.DATABASE.QueryRow(
		"SELECT description FROM ideathons WHERE id = ?",
		req.IdeathonID,
	).Scan(&ideathonDescription)

	// Extract title from ideathon description JSON
	ideathonTitle := "an ideathon"
	if err == nil && ideathonDescription != "" {
		var descData map[string]interface{}
		if err := json.Unmarshal([]byte(ideathonDescription), &descData); err == nil {
			if doc, ok := descData["document"].(map[string]interface{}); ok {
				if title, ok := doc["title"].(string); ok && title != "" {
					ideathonTitle = title
				}
			}
		}
	}

	// Send notification to the winner asynchronously
	go notifications.NotifyWinner(req.IdeathonID, ideathonTitle, req.WinnerID)

	resp := PickWinnerResponse{
		Message:    "Winner selected successfully",
		IdeathonID: req.IdeathonID,
		WinnerID:   req.WinnerID,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
