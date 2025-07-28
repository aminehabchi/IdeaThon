package ideathons

import (
	"errors"
	"strings"
	"time"
)

func Prepare_ideathon_query(params I_params, user_id int) (string, []any) {
	query := `
		SELECT 
			ideathons.*, 
			users.first_name, 
			users.last_name, 
			users.avatar,
			(SELECT COUNT(*) FROM entries WHERE entries.ideathon_id = ideathons.id) AS entries_count
		FROM ideathons
		INNER JOIN users ON users.id = ideathons.user_id
	`

	args := []any{}

	// If category is provided, join with ideathons_categories
	if len(params.Category) > 0 {
		query += `
		INNER JOIN ideathons_categories ON ideathons_categories.ideathon_id = ideathons.id`
	}

	query += " WHERE 1=1"

	if params.Id != 0 {
		query += " AND ideathons.id = ?"
		args = append(args, params.Id)
	}

	if params.User_id > 0 {
		query += " AND ideathons.user_id = ?"
		args = append(args, params.User_id)
	}

	if params.Search != "" {
		query += " AND (ideathons.description LIKE ?)"
		search := "%" + params.Search + "%"
		args = append(args, search)
	}

	if params.StartDate != "" {
		query += " AND ideathons.start_date >= ?"
		args = append(args, params.StartDate)
	}

	if params.EndDate != "" {
		query += " AND ideathons.end_date <= ?"
		args = append(args, params.EndDate)
	}

	// Category filter (if multiple, use IN clause)
	if len(params.Category) > 0 {
		placeholders := make([]string, len(params.Category))
		for i := range params.Category {
			placeholders[i] = "?"
			args = append(args, params.Category[i])
		}
		query += " AND ideathons_categories.category IN (" + strings.Join(placeholders, ",") + ")"
	}

	query += " ORDER BY ideathons.id DESC"

	// // Pagination (OFFSET)
	// query += " LIMIT 10 OFFSET ?"
	// args = append(args, params.Offset)

	return query, args
}

func (i *Ideathons) Check_ideathons_info() error {
	if i.Price < 0 {
		return errors.New("Price must be non-negative")
	}

	layout := "2006-01-02"
	startDate, err := time.Parse(layout, i.Start_date)
	if err != nil {
		return errors.New("Invalid start date format (expected YYYY-MM-DD)")
	}

	endDate, err := time.Parse(layout, i.End_date)
	if err != nil {
		return errors.New("Invalid end date format (expected YYYY-MM-DD)")
	}

	if startDate.After(endDate) {
		return errors.New("Start date must be before end date")
	}

	return nil
}
