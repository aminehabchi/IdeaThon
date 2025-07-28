package report

type Report struct {
	Id          int    `json:"id,omitempty"`
	User_id     int    `json:"user_id,omitempty"`
	Type_id     int    `json:"type_id,omitempty"`
	Email       string `json:"email,omitempty"`
	Subject     string `json:"subject,omitempty"`
	Issue       string `json:"issue"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Created_at  string `json:"created_at,omitempty"`
}
