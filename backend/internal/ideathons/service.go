package ideathons

import (
	"errors"
	"time"
)

func Prepare_ideathon_query(params I_params) (string, []interface{}) {
	query := "SELECT * FROM ideathons WHERE 1=1"
	args := []interface{}{}

	if params.Id != 0 {
		query += " AND id = ?"
		args = append(args, params.Id)
	}

	if params.User_id != 0 {
		query += " AND user_id = ?"
		args = append(args, params.User_id)
	}

	if params.Search != "" {
		query += " AND (title LIKE ? OR description LIKE ?)"
		search := "%" + params.Search + "%"
		args = append(args, search, search)
	}

	if params.StartDate != "" {
		query += " AND start_date >= ?"
		args = append(args, params.StartDate)
	}

	if params.EndDate != "" {
		query += " AND end_date <= ?"
		args = append(args, params.EndDate)
	}

	query += " ORDER BY start_date DESC LIMIT 10 OFFSET ?"
	args = append(args, params.Offset)

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
