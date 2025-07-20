package report

import "errors"

func (r *Report) Check_report_info() error {

	if r.Issue == "" {
		return errors.New("issue is required")
	}

	if r.Type == "" {
		return errors.New("type is required")
	}

	if r.Ideathon_id == 0 && r.Entrie_id == 0 {
		return errors.New("either ideathon_id or entrie_id must be provided")
	}

	return nil
}
