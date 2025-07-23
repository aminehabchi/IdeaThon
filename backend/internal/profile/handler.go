package profile

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func ProfileHandler(w http.ResponseWriter, r *http.Request) {
	// userID, err := utils.Get_id_from_session(r.Header.Get("token"))
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusUnauthorized)
	// 	return
	// }
	userID := 1
	profile, err := FetchUserProfile(userID)
	if err != nil {
		http.Error(w, "Error fetching profile", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPatch {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// userID, err := utils.Get_id_from_session(r.Header.Get("token"))
	userID := 1
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusUnauthorized)
	// 	return
	// }

	var req UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		fmt.Println("01err", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err := UpdateUser(userID, req)
	if err != nil {
		fmt.Println("02err", err)
		http.Error(w, "Failed to update profile", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Profile updated successfully"))
}
