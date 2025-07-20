package profile

import (
	"ideaThon/config"
)

func GetUserProfile(userID int) (*ProfileResponse, error) {
	query := `
	SELECT 
		u.id, u.first_name, u.last_name, u.email, u.avatar, u.phone_number, u.bio,
		IFNULL(SUM(i.price), 0) AS total_prize_won,
		COUNT(i.id) AS won_contexts_count
	FROM users u
	LEFT JOIN ideathons i ON i.winner_id = u.id
	WHERE u.id = ?
	GROUP BY u.id
	`

	row := config.DATABASE.QueryRow(query, userID)

	var resp ProfileResponse
	err := row.Scan(
		&resp.ID,
		&resp.FirstName,
		&resp.LastName,
		&resp.Email,
		&resp.Avatar,
		&resp.PhoneNumber,
		&resp.Bio,
		&resp.TotalPrizeWon,
		&resp.WonContextsCount,
	)
	if err != nil {
		return nil, err
	}

	return &resp, nil
}
