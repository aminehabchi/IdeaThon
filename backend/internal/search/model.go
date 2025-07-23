package search

type SearchRequest struct {
	Query string `json:"query"`
}
type UserResult struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Avatar    string `json:"avatar,omitempty"`
}
type IdeathonResult struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	EndDate string `json:"end_date"`
	OwnerID int    `json:"owner_id"`
}

type SearchResponse struct {
	Users     []UserResult     `json:"users,omitempty"`
	Ideathons []IdeathonResult `json:"ideathons,omitempty"`
}
