package profile

import (
	"encoding/json"
	"ideaThon/utils"
	"net/http"
)

func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := utils.Get_id_from_session(r.Header.Get("token"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	profile, err := FetchUserProfile(userID)
	if err != nil {
		http.Error(w, "Error fetching profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}
