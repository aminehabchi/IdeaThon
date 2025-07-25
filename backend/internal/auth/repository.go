package auth

import (
	"fmt"

	database "ideaThon/config"
	"ideaThon/internal/images"
)

func Get_my_Info(userID int) (User, error) {
	var user User
	db := database.Get_DB()

	query := "SELECT id, first_name, last_name, email, avatar FROM users WHERE id = ?"

	err := db.QueryRow(query, userID).Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Avatar,
	)

	return user, err
}

func Insert_session(id int, token string) error {
	db := database.Get_DB()

	query := `INSERT INTO sessions (user_id, token) VALUES (?, ?)`

	_, err := db.Exec(query, id, token)

	return err
}

func Insert_user_info(user User) error {
	var err error
	user.Avatar, err = images.SaveBase64ImageToPath(user.Avatar, "../images")
	if err != nil {
		fmt.Println(err)
		return err
	}

	db := database.Get_DB()

	query := `
		INSERT INTO users (first_name, last_name, email, password, avatar, phone_number, bio)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	_, err = db.Exec(query, user.FirstName, user.LastName, user.Email, user.Password, user.Avatar, user.PhoneNumber, user.Bio)
	if err != nil {
		return err
	}

	return nil
}

func Get_password(email string) (int, string, error) {
	db := database.Get_DB()

	var hashedPassword string
	var id int
	err := db.QueryRow("SELECT id,password FROM users WHERE email = ?", email).Scan(&id, &hashedPassword)
	if err != nil {
		return 0, "", err
	}
	return id, hashedPassword, nil
}
