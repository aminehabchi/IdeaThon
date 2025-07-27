package report

import "errors"

func (r *Report) Check_report_info() error {
	if r.Issue == "" {
		return errors.New("issue is required")
	}

	if r.Type != "ideathon" && r.Type != "generale" && r.Type != "entry" {
		return errors.New("type must be ideathon, generale, entry.")
	}

	if r.Type_id <= 0 && (r.Type == "ideathon" || r.Type == "entry") {
		return errors.New("either ideathon_id or entrie_id must be provided")
	}

	return nil
}
