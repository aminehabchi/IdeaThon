package profile

type Profile struct {
	ID           int    `json:"id"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Email        string `json:"email"`
	Avatar       string `json:"avatar"`
	PhoneNumber  string `json:"phone_number,omitempty"`
	Bio          string `json:"bio,omitempty"`
	Ideathons    int    `json:"ideathons,omitempty"`
	Entries      int    `json:"entries,omitempty"`
	Total_wins   int    `json:"total_wins,omitempty"`
	Total_prices int    `json:"total_prices,omitempty"`
}

type UpdateProfileRequest struct {
	Avatar      *string `json:"avatar,omitempty"`
	FirstName   *string `json:"first_name,omitempty"`
	LastName    *string `json:"last_name,omitempty"`
	Email       *string `json:"email,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Country     *string `json:"country,omitempty"`
	Bio         *string `json:"bio,omitempty"`
}
