package ideathons

import (
	database "ideaThon/config"
	"ideaThon/internal/images"
)

func Update_ideathon(user_id int, ideathon Ideathons) error {
	db := database.Get_DB()

	var err error
	ideathon.Banner, err = images.SaveBase64ImageToPath(ideathon.Banner, "../images")
	if err != nil {
		return err
	}

	query := `
		UPDATE ideathons
		SET title = ?, description = ?, banner = ?, start_date = ?, price = ?, end_date = ?, privacy = ?
		WHERE id = ? AND user_id = ?
	`

	_, err = db.Exec(
		query,
		ideathon.Title,
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

func Insert_ideathons_info(ideathon Ideathons) error {
	var err error

	ideathon.Banner, err = images.SaveBase64ImageToPath(ideathon.Banner, "../images")
	if err != nil {
		return err
	}

	db := database.Get_DB()

	query := `
		INSERT INTO ideathons (user_id, title, description, banner, start_date, price, end_date, privacy)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	`

	_, err = db.Exec(
		query,
		ideathon.User_id,
		ideathon.Title,
		ideathon.Description,
		ideathon.Banner,
		ideathon.Start_date,
		ideathon.Price,
		ideathon.End_date,
		ideathon.Privacy,
	)
	if err != nil {
		return err
	}

	return nil
}
