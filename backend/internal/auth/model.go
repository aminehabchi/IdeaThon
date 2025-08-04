package auth

type User struct {
	ID          int    `json:"id,omitempty"`
	FirstName   string `json:"first_name,omitempty"`
	LastName    string `json:"last_name,omitempty"`
	Email       string `json:"email,omitempty"`
	Password    string `json:"password,omitempty"`
	Avatar      string `json:"avatar,omitempty"`
	PhoneNumber string `json:"phone_number,omitempty"`
	Bio         string `json:"bio,omitempty"`
	Role        string `json:"role,omitempty"`
	Is_banned   int    `json:"is_banned,omitempty"`
}
