package entries

import (
	"errors"
	"strings"
)

func (e *Entries) Check_entries_info() error {
	if e.User_id == 0 {
		return errors.New("user_id is required")
	}
	if e.Ideathon_id == 0 {
		return errors.New("ideathon_id is required")
	}

	e.Title = strings.TrimSpace(e.Title)
	if e.Title == "" {
		return errors.New("title is required")
	}

	e.Description = strings.TrimSpace(e.Description)
	if e.Description == "" {
		return errors.New("description is required")
	}

	return nil
}
