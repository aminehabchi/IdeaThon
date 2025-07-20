package profile

func FetchUserProfile(userID int) (*ProfileResponse, error) {
	return GetUserProfile(userID)
}
func UpdateUser(userID int, data UpdateProfileRequest) error {
	return UpdateUserProfile(userID, data)
}
