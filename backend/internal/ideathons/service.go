package ideathons

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
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

func Get_params(r *http.Request, user_id int) I_params {
	query := r.URL.Query()
	var params I_params

	params.User_id = user_id

	params.Id, _ = strconv.Atoi(query.Get("id"))

	params.Offset, _ = strconv.Atoi(query.Get("offset"))

	params.Category = query.Get("category")
	params.Search = query.Get("search")
	params.StartDate = query.Get("start_date")
	params.EndDate = query.Get("end_date")

	return params
}

func (i *Ideathons) Check_ideathons_info() error {
	i.Title = strings.TrimSpace(i.Title)
	if len(i.Title) < 6 {
		return errors.New("Title must be at least 6 characters")
	}

	i.Description = strings.TrimSpace(i.Description)
	if len(i.Description) < 6 {
		return errors.New("Description must be at least 6 characters")
	}

	if i.Price < 0 {
		return errors.New("Price must be non-negative")
	}

	if i.User_id <= 0 {
		return errors.New("User ID must be valid")
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
