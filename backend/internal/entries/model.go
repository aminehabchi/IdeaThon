package entries

type Entries struct {
	Id          int    `json:"id,omitempty"`
	User_id     int    `json:"user_id"`
	Ideathon_id int    `json:"ideathon_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Banner      string `json:"banner,omitempty"`
	Created_at  string `json:"created_at,omitempty"`
	Is_win      bool   `json:"is_win,omitempty"`
}
