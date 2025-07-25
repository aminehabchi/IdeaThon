package profile


func UpdateUser(userID int, data UpdateProfileRequest) error {
	return UpdateUserProfile(userID, data)
}
