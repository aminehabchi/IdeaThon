package ideathons

type Ideathons struct {
	Id          int `json:"id"`
	User_id     int
	Title       string `json:"title"`
	Description string `json:"description"`
	Banner      string `json:"banner,omitempty"`
	Start_date  string `json:"start_date"`
	Price       int    `json:"price"`
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
