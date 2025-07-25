package profile

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Get_profile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	profile_id, err := strconv.Atoi(r.FormValue("profile_id"))
	if err != nil || profile_id < 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid profile Id"))
		return
	}

	if profile_id == 0 {
		userID, ok := r.Context().Value(middle.UserIDKey).(int)
		if !ok {
			utils.SendResponseStatus(w, http.StatusUnauthorized, errors.New("You don't have a profile"))
			return
		}
		profile_id = userID
	}

	profile, err := Get_Profile_DB(profile_id)
	if err != nil {
		log.Println("Get_Profile_DB -> ", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("Error fetching profile"))
		return
	}

	err = utils.Encode(w, profile)
	if err != nil {
		log.Println("Encode -> ", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
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
