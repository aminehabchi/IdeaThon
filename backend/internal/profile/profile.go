package profile

import (
	"database/sql"
	"encoding/json"
	"ideaThon/config"
	"ideaThon/internal/auth"
	"ideaThon/utils"
	"net/http"
)

type ProfileResponse struct {
	auth.User
	TotalPrizeWon    int `json:"total_prize_won"`
	WonContextsCount int `json:"won_contexts_count"`
}

func Profile(w http.ResponseWriter, r *http.Request) {
	// TODO: Replace this mock token with real session or JWT parsing
	userID, err := utils.Get_id_from_session(r.Header.Get("token"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	query := `
	SELECT 
		u.id, u.first_name, u.last_name, u.email, u.avatar, u.phone_number, u.bio,
		IFNULL(SUM(i.price), 0) AS total_prize_won,
		COUNT(i.id) AS won_contexts_count
	FROM users u
	LEFT JOIN ideathons i ON i.winner_id = u.id
	WHERE u.id = ?
	GROUP BY u.id
	`

	row := config.DATABASE.QueryRow(query, userID)

	var resp ProfileResponse
	err = row.Scan(
		&resp.ID,
		&resp.FirstName,
		&resp.LastName,
		&resp.Email,
		&resp.Avatar,
		&resp.PhoneNumber,
		&resp.Bio,
		&resp.TotalPrizeWon,
		&resp.WonContextsCount,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, "Database error", http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
