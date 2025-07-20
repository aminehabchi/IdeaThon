package profile

type ProfileResponse struct {
	ID          int    `json:"id,omitempty"`
	FirstName   string `json:"first_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	Email       string `json:"email"`
	Avatar      string `json:"avatar,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Bio         string `json:"bio,omitempty"`

	TotalPrizeWon    int `json:"total_prize_won"`
	WonContextsCount int `json:"won_contexts_count"`
}
type UpdateProfileRequest struct {
	FirstName   *string `json:"first_name,omitempty"`
	LastName    *string `json:"last_name,omitempty"`
	Avatar      *string `json:"avatar,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Bio         *string `json:"bio,omitempty"`
}
