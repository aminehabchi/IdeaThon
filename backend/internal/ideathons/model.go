package ideathons

type Ideathons struct {
	Id          int      `json:"id,omitempty"`
	User_id     int      `json:"user_id,omitempty"`
	Description string   `json:"description,omitempty"`
	Banner      string   `json:"banner,omitempty"`
	Price       int      `json:"price,omitempty"`
	Created_at  string   `json:"created_at,omitempty"`
	Start_date  string   `json:"start_date,omitempty"`
	End_date    string   `json:"end_date,omitempty"`
	Category    []string `json:"category,omitempty"`
	Winner_id   *int     `json:"winner_id,omitempty"`
	Privacy     string   `json:"privacy,omitempty"`
}

type I_params struct {
	Id        int      `json:"id,omitempty"`
	User_id   int      `json:"user_id,omitempty"`
	Category  []string `json:"category,omitempty"`
	Search    string   `json:"search,omitempty"`
	StartDate string   `json:"start_date,omitempty"`
	EndDate   string   `json:"end_date,omitempty"`
	Offset    int      `json:"offset"`
}
