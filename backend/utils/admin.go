package utils

import (
	"ideaThon/config"
)

func Check_is_admin(id int) (bool, error) {
	query := "SELECT role FROM users WHERE id = ?"
	db := config.Get_DB()
	var role string

	err := db.QueryRow(query, id).Scan(&role)

	return role == "admin", err
}
