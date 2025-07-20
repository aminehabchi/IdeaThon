package ideathons

type Ideathons struct {
	Id          int    `json:"id"`
	User_id     int    `json:"user_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Banner      string `json:"banner,omitempty"`
	Price       int    `json:"price"`
	Created_at  string `json:"created_at"`
	Start_date  string `json:"start_date"`
	End_date    string `json:"end_date"`
	Privacy     bool   `json:"privacy"`
}

type I_params struct {
	Id        int
	User_id   int
	Category  string
	Search    string
	StartDate string
	EndDate   string
	Offset    int
}
