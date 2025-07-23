package profile

type Ideathon struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	Banner      string `json:"banner"`
	StartDate   string `json:"start_date"`
	Price       int    `json:"price"`
	EndDate     string `json:"end_date"`
	Winner_id   *int   `json:"winner_id"`
	Privacy     string `json:"privacy"`
}

type Entry struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IdeathonID  int    `json:"ideathon_id"`
	CreatedAt   string `json:"created_at"`
}

type ProfileResponse struct {
	ID               int        `json:"id"`
	FirstName        string     `json:"first_name"`
	LastName         string     `json:"last_name"`
	Email            string     `json:"email"`
	Avatar           string     `json:"avatar"`
	PhoneNumber      string     `json:"phone_number"`
	Bio              string     `json:"bio"`
	CreatedIdeathons []Ideathon `json:"created_ideathons"`
	SubmittedEntries []Entry    `json:"submitted_entries"`
}
type UpdateProfileRequest struct {
	Avatar      *string `json:"avatar,omitempty"`
	FirstName   *string `json:"first_name,omitempty"`
	LastName    *string `json:"last_name,omitempty"`
	Email       *string `json:"email,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Country     *string `json:"country,omitempty"`
	Bio         *string `json:"bio,omitempty"`
}
