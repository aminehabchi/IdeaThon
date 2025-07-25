package ideathons

import (
	"fmt"
	database "ideaThon/config"
	"ideaThon/internal/images"
	"time"
)

func Get_ideathons_Db(query string, args []interface{}) ([]Ideathons, error) {
	db := database.Get_DB()

	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("db query error: %w", err)
	}
	defer rows.Close()

	var ideathons []Ideathons

	for rows.Next() {
		var i Ideathons
		var time1, time2 time.Time

		if err := rows.Scan(
			&i.Id,
			&i.Owner.ID,
			&i.Description,
			&i.Banner,
			&time1,
			&i.Price,
			&time2,
			&i.Winner_id,
			&i.Privacy,
			&i.Owner.FirstName,
			&i.Owner.LastName,
			&i.Owner.Avatar,
			&i.Entries,
		); err != nil {
			return nil, fmt.Errorf("row scan error: %w", err)
		}

		// Convert time.Time → string
		i.Start_date = time1.Format("2006-01-02 15:04:05")
		i.End_date = time2.Format("2006-01-02 15:04:05")

		i.Category, err = Get_categories_by_ideathon_ID(i.Id)
		if err == nil {
			ideathons = append(ideathons, i)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return ideathons, nil
}
func Insert_categories(ideathonID int, categorys []string) error {
	db := database.Get_DB()

	tx, err := db.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}

	stmt, err := tx.Prepare("INSERT INTO ideathons_categories (ideathon_id, category) VALUES (?, ?)")
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to prepare statement: %w", err)
	}
	defer stmt.Close()

	for _, categoryID := range categorys {
		_, err := stmt.Exec(ideathonID, categoryID)
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to insert category '%s': %w", categoryID, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

func Get_categories_by_ideathon_ID(ideathonID int) ([]string, error) {
	db := database.Get_DB()

	query := `
		SELECT category FROM ideathons_categories WHERE ideathon_id = ?
	`

	rows, err := db.Query(query, ideathonID)
	if err != nil {
		return nil, fmt.Errorf("query error: %w", err)
	}
	defer rows.Close()

	var categories []string
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, fmt.Errorf("scan error: %w", err)
		}
		categories = append(categories, name)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error: %w", err)
	}

	return categories, nil
}

func Update_ideathon(user_id int, ideathon Ideathons) error {
	db := database.Get_DB()

	var err error
	ideathon.Banner, err = images.SaveBase64ImageToPath(ideathon.Banner, "../images")
	if err != nil {
		return err
	}

	query := `
		UPDATE ideathons
		SET description = ?, banner = ?, start_date = ?, price = ?, end_date = ?, privacy = ?
		WHERE id = ? AND user_id = ?
	`

	_, err = db.Exec(
		query,
		ideathon.Description,
		ideathon.Banner,
		ideathon.Start_date,
		ideathon.Price,
		ideathon.End_date,
		ideathon.Privacy,
		ideathon.Id,
		user_id,
	)

	return err
}

func Delete_ideathon(ideathon_id, user_id int) error {
	db := database.Get_DB()
	query := "DELETE FROM ideathons WHERE id=? AND user_id=?"
	_, err := db.Exec(query, ideathon_id, user_id)
	return err
}

func Insert_ideathons_info(ideathon Ideathons) (int, error) {
	var err error

	ideathon.Banner, err = images.SaveBase64ImageToPath(ideathon.Banner, "../images")
	if err != nil {
		return 0, err
	}

	db := database.Get_DB()

	query := `
		INSERT INTO ideathons (user_id, description, banner, start_date, price, end_date, privacy)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	result, err := db.Exec(
		query,
		ideathon.Owner.ID,
		ideathon.Description,
		ideathon.Banner,
		ideathon.Start_date,
		ideathon.Price,
		ideathon.End_date,
		ideathon.Privacy,
	)
	if err != nil {
		return 0, err
	}

	last_id, err := result.LastInsertId()

	return int(last_id), err
}
