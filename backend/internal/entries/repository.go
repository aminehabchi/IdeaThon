package entries

import (
	database "ideaThon/config"
	"ideaThon/internal/images"
)

func Get_entries_Db(query string, args []any) ([]Entries, error) {
	var entries []Entries

	rows, err := database.Get_DB().Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var e Entries

		err := rows.Scan(
			&e.Id,
			&e.User_id,
			&e.Ideathon_id,
			&e.Description,
			&e.Banner,
			&e.Is_win,
			&e.Created_at,
		)
		if err != nil {
			return nil, err
		}

		entries = append(entries, e)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return entries, nil
}

func Update_entrie_DB(user_id int, entrie Entries) error {
	var err error
	var query string
	var args []interface{}

	if entrie.Banner != "" {
		entrie.Banner, err = images.SaveBase64ImageToPath(entrie.Banner, "../images")
		if err != nil {
			return err
		}

		query = `
			UPDATE entries 
			SET  description = ?, banner = ?, is_win = ?
			WHERE id = ? AND user_id = ?
		`
		args = []interface{}{
			entrie.Description,
			entrie.Banner,
			boolToInt(entrie.Is_win),
			entrie.Id,
			user_id,
		}
	} else {
		query = `
			UPDATE entries 
			SET description = ?, is_win = ?
			WHERE id = ? AND user_id = ?
		`
		args = []interface{}{
			entrie.Description,
			boolToInt(entrie.Is_win),
			entrie.Id,
			user_id,
		}
	}

	_, err = database.Get_DB().Exec(query, args...)
	return err
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}

func Delete_entrie_DB(entries_id, user_id int) error {
	query := "DELETE FROM  WHERE entries id=? AND user_id=?"
	_, err := database.Get_DB().Exec(query, entries_id, user_id)
	return err
}

func Insert_entries(entrie Entries) (int, error) {
	var err error

	entrie.Banner, err = images.SaveBase64ImageToPath(entrie.Banner, "../images")
	if err != nil {
		return 0, err
	}

	query := `
		INSERT INTO entries (user_id, ideathon_id, description, banner, is_win)
		VALUES (?, ?, ?, ?, ?)
	`

	result, err := database.Get_DB().Exec(
		query,
		entrie.User_id,
		entrie.Ideathon_id,
		entrie.Description,
		entrie.Banner,
		0, // is_win default
	)
	if err != nil {
		return 0, err
	}

	insertedID, err := result.LastInsertId()

	return int(insertedID), err
}
