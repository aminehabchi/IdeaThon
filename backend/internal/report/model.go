package report

type Report struct {
	Id          int    `json:"id,omitempty"`
	User_id     int    `json:"user_id,omitempty"`
	Ideathon_id int    `json:"ideathon_id,omitempty"`
	Entrie_id   int    `json:"entrie_id,omitempty"`
	Issue       string `json:"issue"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Created_at  string `json:"created_at,omitempty"`
}
