package profile

func FetchUserProfile(userID int) (*ProfileResponse, error) {
	return GetUserProfile(userID)
}
