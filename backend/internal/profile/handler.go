package profile

import (
	"encoding/json"
	"fmt"
	middle "ideaThon/middlewares"
	"net/http"
)

func ProfileHandler(w http.ResponseWriter, r *http.Request) {

	userID := r.Context().Value(middle.UserIDKey).(int)
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
	userID := r.Context().Value(middle.UserIDKey).(int)

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
