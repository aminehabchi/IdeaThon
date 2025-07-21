package profile

type Ideathon struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Banner      string `json:"banner"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	Price       int    `json:"price"`
	Privacy     int    `json:"privacy"`
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
	FirstName   *string `json:"first_name,omitempty"`
	LastName    *string `json:"last_name,omitempty"`
	Avatar      *string `json:"avatar,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	Bio         *string `json:"bio,omitempty"`
}
