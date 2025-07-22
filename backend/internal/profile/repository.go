package profile

import (
	"database/sql"
	"fmt"
	"strings"

	"ideaThon/config"
)

func GetUserProfile(userID int) (*ProfileResponse, error) {
	var resp ProfileResponse

	// Step 1: Get User Info
	userQuery := `
	SELECT id, first_name, last_name, email, avatar, phone_number, bio
	FROM users
	WHERE id = ?
	`
	err := config.DATABASE.QueryRow(userQuery, userID).Scan(
		&resp.ID, &resp.FirstName, &resp.LastName, &resp.Email,
		&resp.Avatar, &resp.PhoneNumber, &resp.Bio,
	)
	if err != nil {
		fmt.Println("errr1", err)
		return nil, err
	}

	// Step 2: Get Created Ideathons
	ideathonQuery := `
	SELECT id, description, banner, start_date, price, end_date, privacy, winner_id
	FROM ideathons
	WHERE user_id = ?
	ORDER BY start_date DESC
	`

	ideathonRows, err := config.DATABASE.Query(ideathonQuery, userID)
	if err != nil {
		fmt.Println("errr2", err)
		return nil, err
	}
	defer ideathonRows.Close()

	var createdIdeathons []Ideathon
	for ideathonRows.Next() {
		var i Ideathon
		var winner sql.NullInt64 

		err := ideathonRows.Scan(
			&i.ID,
			&i.Description,
			&i.Banner,
			&i.StartDate,
			&i.Price,
			&i.EndDate,
			&i.Privacy,
			&winner, 
		)
		if err != nil {	
			fmt.Println("errr3", err)
			continue // skip bad row but continue processing others
		}

		// Convert sql.NullInt64 to *int
		if winner.Valid {
			val := int(winner.Int64)
			i.Winner_id = &val
		} else {
			i.Winner_id = nil
		}

		createdIdeathons = append(createdIdeathons, i)
	}
	resp.CreatedIdeathons = createdIdeathons

	// Step 3: Get Submitted Entries
	entryQuery := `
	SELECT id, title, description, ideathon_id, created_at
	FROM entries
	WHERE user_id = ?
	ORDER BY created_at DESC
	`
	entryRows, err := config.DATABASE.Query(entryQuery, userID)
	if err != nil {
		fmt.Println("errr4", err)
		return nil, err
	}
	defer entryRows.Close()

	var entries []Entry
	for entryRows.Next() {
		var e Entry
		err := entryRows.Scan(&e.ID, &e.Title, &e.Description, &e.IdeathonID, &e.CreatedAt)
		if err != nil {
			return nil, err
		}
		entries = append(entries, e)
	}
	resp.SubmittedEntries = entries

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
