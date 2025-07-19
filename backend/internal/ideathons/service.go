package ideathons

import (
	"errors"
	"strings"
	"time"
)

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
