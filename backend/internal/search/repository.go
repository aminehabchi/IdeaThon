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
	searchQuery := "%" + query + "%"
	rows, err := r.DB.Query(`
		SELECT id, first_name, last_name, COALESCE(avatar, '') as avatar
		FROM users
		WHERE first_name LIKE ? OR last_name LIKE ?
	`, searchQuery, searchQuery)
	if err != nil {
		return nil, fmt.Errorf("search users: %w", err)
	}
	defer rows.Close()

	var users []UserResult
	for rows.Next() {
		var u UserResult
		if err := rows.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Avatar); err != nil {
			return nil, fmt.Errorf("scan user row: %w", err)
		}
		users = append(users, u)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate user rows: %w", err)
	}

	return users, nil
}

func (r *Repository) SearchIdeathons(query string) ([]IdeathonResult, error) {
	searchQuery := "%" + query + "%"
	rows, err := r.DB.Query(`
		SELECT id, description, end_date
		FROM ideathons
		WHERE description LIKE ?
	`, searchQuery)
	if err != nil {
		return nil, fmt.Errorf("search ideathons: %w", err)
	}
	defer rows.Close()

	var ideathons []IdeathonResult
	for rows.Next() {
		var i IdeathonResult
		// Fixed: added end_date to Scan - it was missing before
		if err := rows.Scan(&i.ID, &i.Description,  &i.EndDate); err != nil {
			return nil, fmt.Errorf("scan ideathon row: %w", err)
		}
		ideathons = append(ideathons, i)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate ideathon rows: %w", err)
	}

	return ideathons, nil
}
