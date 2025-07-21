package ideathons

import (
	database "ideaThon/config"
	"ideaThon/internal/images"
)

func Get_ideathons_Db(query string, args []interface{}) ([]Ideathons, error) {
	db := database.Get_DB()

	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ideathons []Ideathons

	for rows.Next() {
		var i Ideathons
		var privacyInt int // intermediate to convert int->bool

		err := rows.Scan(
			&i.Id,
			&i.User_id,
			&i.Description,
			&i.Banner,
			&i.Start_date,
			&i.Price,
			&i.End_date,
			&privacyInt,
		)
		if err != nil {
			return nil, err
		}

		// Convert privacy integer (0 or 1) to bool
		if privacyInt != 0 {
			i.Privacy = "dsf"
		} else {
			i.Privacy = "dsd"
		}
		ideathons = append(ideathons, i)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return ideathons, nil
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
		ideathon.User_id,
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
