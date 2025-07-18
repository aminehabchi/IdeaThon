package auth

import "ideaThon/config"

func Insert_user_info(user User) error {
	db := config.Get_DB()

	query := `
		INSERT INTO users (first_name, last_name, email, password, avatar, phone_number, bio)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	_, err := db.Exec(query, user.FirstName, user.LastName, user.Email, user.Password, user.Avatar, user.PhoneNumber, user.Bio)
	if err != nil {
		return err
	}

	return nil
}
