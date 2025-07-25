package profile

import (
	"fmt"
	"strings"

	"ideaThon/config"
)

func Get_Profile_DB(profile_id int) (Profile, error) {
	var p Profile

	userQuery := `
	SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.avatar,
    u.phone_number,
    u.bio,

    -- Total entries submitted
    (SELECT COUNT(*) FROM entries e WHERE e.user_id = u.id) AS total_entries,

    -- Total ideathons created
    (SELECT COUNT(*) FROM ideathons i WHERE i.user_id = u.id) AS total_ideathons,

    -- Total price of ideathons the user WON (joined through entries with is_win = 1)
    (
        SELECT COALESCE(SUM(i.price), 0)
        FROM ideathons i
        JOIN entries e ON i.id = e.ideathon_id
        WHERE e.user_id = u.id AND e.is_win = 1
    ) AS total_price,

    -- Total number of ideathons the user won
    (
        SELECT COUNT(*)
        FROM entries e
        WHERE e.user_id = u.id AND e.is_win = 1
    ) AS total_wins

	FROM users u
	WHERE u.id = ?;
	`
	err := config.DATABASE.QueryRow(userQuery, profile_id).Scan(
		&p.ID,
		&p.FirstName,
		&p.LastName,
		&p.Email,
		&p.Avatar,
		&p.PhoneNumber,
		&p.Bio,
		&p.Entries,
		&p.Ideathons,
		&p.Total_prices,
		&p.Total_wins, // <== ADD THIS
	)
	if err != nil {
		return p, err
	}

	return p, nil
}

func UpdateUserProfile(userID int, data UpdateProfileRequest) error {
	fmt.Println("dkhl", data)
	query := "UPDATE users SET "
	args := []interface{}{}
	fields := []string{}
	if data.Avatar != nil {
		fields = append(fields, "avatar = ?")
		args = append(args, *data.Avatar)
	}
	if data.FirstName != nil {
		fields = append(fields, "first_name = ?")
		args = append(args, *data.FirstName)
	}
	if data.LastName != nil {
		fields = append(fields, "last_name = ?")
		args = append(args, *data.LastName)
	}
	if data.Email != nil {
		fields = append(fields, "email = ?")
		args = append(args, *data.Email)
	}
	if data.PhoneNumber != nil {
		fields = append(fields, "phone_number = ?")
		args = append(args, *data.PhoneNumber)
	}
	if data.Country != nil {
		fields = append(fields, "country = ?")
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
