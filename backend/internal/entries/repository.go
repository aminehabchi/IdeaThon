package entries

import (
	database "ideaThon/config"
	"ideaThon/internal/images"
)

func Update_entrie_DB(user_id int, entrie Entries) error {
	db := database.Get_DB()

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
			SET title = ?, description = ?, banner = ?, is_win = ?
			WHERE id = ? AND user_id = ?
		`
		args = []interface{}{
			entrie.Title,
			entrie.Description,
			entrie.Banner,
			boolToInt(entrie.Is_win),
			entrie.Id,
			user_id,
		}
	} else {
		query = `
			UPDATE entries 
			SET title = ?, description = ?, is_win = ?
			WHERE id = ? AND user_id = ?
		`
		args = []interface{}{
			entrie.Title,
			entrie.Description,
			boolToInt(entrie.Is_win),
			entrie.Id,
			user_id,
		}
	}

	_, err = db.Exec(query, args...)
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

func Insert_entries(entrie Entries) error {
	var err error

	entrie.Banner, err = images.SaveBase64ImageToPath(entrie.Banner, "../images")
	if err != nil {
		return err
	}

	query := `
		INSERT INTO entries (user_id, ideathon_id, title, description, banner, is_win)
		VALUES (?, ?, ?, ?, ?, ?)
	`

	_, err = database.Get_DB().Exec(
		query,
		entrie.User_id,
		entrie.Ideathon_id,
		entrie.Title,
		entrie.Description,
		entrie.Banner,
		0, // is_win default
	)

	return err
}
