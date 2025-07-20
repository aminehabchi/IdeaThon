package profile

import (
	"ideaThon/config"
	"strings"
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

func UpdateUserProfile(userID int, data UpdateProfileRequest) error {
	query := "UPDATE users SET "
	args := []interface{}{}
	fields := []string{}

	if data.FirstName != nil {
		fields = append(fields, "first_name = ?")
		args = append(args, *data.FirstName)
	}
	if data.LastName != nil {
		fields = append(fields, "last_name = ?")
		args = append(args, *data.LastName)
	}
	if data.Avatar != nil {
		fields = append(fields, "avatar = ?")
		args = append(args, *data.Avatar)
	}
	if data.PhoneNumber != nil {
		fields = append(fields, "phone_number = ?")
		args = append(args, *data.PhoneNumber)
	}
	if data.Bio != nil {
		fields = append(fields, "bio = ?")
		args = append(args, *data.Bio)
	}

	if len(fields) == 0 {
		// No fields to update
		return nil
	}

	query += strings.Join(fields, ", ") + " WHERE id = ?"
	args = append(args, userID)

	_, err := config.DATABASE.Exec(query, args...)
	return err
}
