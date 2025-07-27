package report

import (
	"errors"
	"strings"
)

func (r *Report) Check_report_info() error {
	// Trim spaces from issue and description
	r.Issue = strings.TrimSpace(r.Issue)
	r.Description = strings.TrimSpace(r.Description)

	// Validate issue
	validIssues := map[string]bool{
		"spam":           true,
		"harassment":     true,
		"misinformation": true,
		"other":          true,
		"copyright":      true,
		"inappropriate":  true,
		"illegal":        true,
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

	if len(r.Description) <= 20 {
		return errors.New("description must be longer than 20 characters")
	}

	return nil
}
