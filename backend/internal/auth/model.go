package auth

type User struct {
	ID          int    `json:"id,omitempty"`
	FirstName   string `json:"first_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Avatar      string `json:"avatar,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Bio         string `json:"bio,omitempty"`
}
