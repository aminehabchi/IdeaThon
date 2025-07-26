package entries

import (
	"errors"
	"strings"
)

func Prepare_entries_query(params Params) (string, []any) {
	// Select entries columns plus user info
	query := `
        SELECT 
            entries.*,
			users.id,
            users.first_name,
            users.last_name,
            users.avatar
        FROM entries
        INNER JOIN users ON entries.user_id = users.id
    `
	conditions := []string{}
	args := []any{}

	if params.User_id > 0 {
		conditions = append(conditions, "entries.user_id = ?")
		args = append(args, params.User_id)
	}
	if params.Ideathon_id > 0 {
		conditions = append(conditions, "entries.ideathon_id = ?")
		args = append(args, params.Ideathon_id)
	}
	if params.Entries_id > 0 {
		conditions = append(conditions, "entries.id = ?")
		args = append(args, params.Entries_id)
	}

	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
	}

	query += " ORDER BY entries.created_at DESC"

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
