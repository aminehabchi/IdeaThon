package profile

import (
	"errors"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
)

func Get_profile_ID(r *http.Request) (int, error) {
	profileStr := r.FormValue("profile_id")
	profileID, err := strconv.Atoi(profileStr)

	if (err != nil || profileID < 0) && profileStr != "" {
		return 0, errors.New("Invalid profile ID")
	}

	if profileID == 0 {
		userID, ok := r.Context().Value(middle.UserIDKey).(int)
		if !ok {
			return 0, errors.New("You don't have a profile")
		}
		profileID = userID
	}

	return profileID, nil
}

func UpdateUser(userID int, data UpdateProfileRequest) error {
	return UpdateUserProfile(userID, data)
}
