package report

import (
	"errors"
	"strings"
)

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
		"security": 	  true,
		"general": 		  true,
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
