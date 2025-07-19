package ideathons

type Ideathons struct {
	Id          int `json:"id"`
	User_id     int
	Title       string `json:"title"`
	Description string `json:"description"`
	Start_date  string `json:"start_date"`
	Price       int    `json:"price"`
	End_date    string `json:"end_date"`
	Privacy     bool   `json:"privacy"`
}
