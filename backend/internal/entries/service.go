package entries

import (
	"errors"
	"strings"
)

func Prepare_entries_query(params Params) (string, []any) {
	query := "SELECT * FROM entries"
	conditions := []string{}
	args := []any{}

	if params.User_id > 0 {
		conditions = append(conditions, "user_id = ?")
		args = append(args, params.User_id)
	}
	if params.Ideathon_id > 0 {
		conditions = append(conditions, "ideathon_id = ?")
		args = append(args, params.Ideathon_id)
	}
	if params.Entries_id > 0 {
		conditions = append(conditions, "id = ?")
		args = append(args, params.Entries_id)
	}

	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
	}

	query += " ORDER BY created_at DESC"

	if params.Offset >= 0 {
		query += " LIMIT 10 OFFSET ?"
		args = append(args, params.Offset)
	}

	return query, args
}

func (e *Entries) Check_entries_info() error {
	if e.User_id <= 0 {
		return errors.New("user_id is required")
	}

	if e.Ideathon_id <= 0 {
		return errors.New("ideathon_id is required")
	}

	return nil
}
