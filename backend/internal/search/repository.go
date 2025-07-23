package search

import (
	"database/sql"
	"fmt"
)

type Repository struct {
	DB *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) SearchUsers(query string) ([]UserResult, error) {
	query = "%" + query + "%"
	rows, err := r.DB.Query(`
		SELECT id, first_name, last_name, avatar
		FROM users
		WHERE first_name LIKE ? OR last_name LIKE ?
	`, query, query)
	if err != nil {
		return nil, fmt.Errorf("search users: %w", err)
	}
	defer rows.Close()

	var users []UserResult
	for rows.Next() {
		var u UserResult
		if err := rows.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Avatar); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func (r *Repository) SearchIdeathons(query string) ([]IdeathonResult, error) {
	query = "%" + query + "%"
	rows, err := r.DB.Query(`
		SELECT id, title, content, owner_id
		FROM ideathons
		WHERE title LIKE ? OR content LIKE ?
	`, query, query)
	if err != nil {
		return nil, fmt.Errorf("search ideathons: %w", err)
	}
	defer rows.Close()

	var ideathons []IdeathonResult
	for rows.Next() {
		var i IdeathonResult
		if err := rows.Scan(&i.ID, &i.Title, &i.OwnerID); err != nil {
			return nil, err
		}
		ideathons = append(ideathons, i)
	}
	return ideathons, nil
}
