package report

import (
	"errors"
	"strings"
)

func Prepare_report_query(filter Filter) (string, []any) {
	query := `
		SELECT
			id, user_id, type_id, email, subject, type, issue, description, is_solved, created_at
		FROM report
		WHERE 1=1
	`
	args := []any{}

	if filter.Id != 0 {
		query += " AND id = ?"
		args = append(args, filter.Id)
	}

	if filter.User_id != 0 {
		query += " AND user_id = ?"
		args = append(args, filter.User_id)
	}

	if filter.Type_id != 0 {
		query += " AND type_id = ?"
		args = append(args, filter.Type_id)
	}

	if filter.Issue != "" {
		query += " AND issue = ?"
		args = append(args, filter.Issue)
	}

	if filter.Type != "" {
		query += " AND type = ?"
		args = append(args, filter.Type)
	}

	if filter.Search != "" {
		// Search in subject and description fields for example
		searchTerm := "%" + filter.Search + "%"
		query += " AND (subject LIKE ? OR description LIKE ?)"
		args = append(args, searchTerm, searchTerm)
	}

	query += " AND is_solved = ?"
	if filter.Is_solved {
		args = append(args, 1)
	} else {
		args = append(args, 0)
	}

	// Optional sorting by allowed columns
	allowedSortFields := map[string]bool{
		"created_at": true,
		"id":         true,
		"user_id":    true,
	}

	sortBy := "created_at DESC" // default
	if filter.Sort_by != "" && allowedSortFields[filter.Sort_by] {
		sortBy = filter.Sort_by + " DESC"
	}
	query += " ORDER BY " + sortBy

	return query, args
}

func (r *Report) Check_report_info() error {
	// Trim spaces from issue and description
	r.Issue = strings.TrimSpace(r.Issue)
	r.Description = strings.TrimSpace(r.Description)
	r.Email = strings.TrimSpace(r.Email)
	r.Subject = strings.TrimSpace(r.Subject)
	// Validate issue type
	validIssues := map[string]bool{
		"spam":           true,
		"harassment":     true,
		"misinformation": true,
		"other":          true,
		"copyright":      true,
		"inappropriate":  true,
		"illegal":        true,
		"bug":            true,
		"feature":        true,
		"security":       true,
		"general":        true,
	}

	if r.Issue == "" {
		return errors.New("issue is required")
	}

	if !validIssues[r.Issue] {
		return errors.New("invalid issue type")
	}

	// Validate type
	if r.Type != "ideathon" && r.Type != "generale" && r.Type != "entrie" {
		return errors.New("type must be 'ideathon', 'generale' or 'entrie'")
	}

	// Validate ID
	if r.Type_id <= 0 && (r.Type == "ideathon" || r.Type == "entrie") {
		return errors.New("either ideathon_id or entrie_id must be provided")
	}
	// if  len(r.Description) <= 20 || r.Description != ""  {
	// 	return errors.New("description must be longer than 20 characters")
	// }

	if r.Email == "" || !strings.Contains(r.Email, "@") || !strings.Contains(r.Email, ".") {
		return errors.New("email is required")
	}
	if r.Subject == "" || (len(r.Subject) < 10 && len(r.Subject) > 100) {
		return errors.New("subject is required")
	}

	return nil
}
