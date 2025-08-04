package report

import (
	"strings"

	database "ideaThon/config"
)

func GetReports(query string, args []any) ([]Report, error) {
	db := database.Get_DB()

	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reports []Report

	for rows.Next() {
		var r Report
		var isSolvedInt int

		err := rows.Scan(
			&r.Id,
			&r.User_id,
			&r.Type_id,
			&r.Email,
			&r.Subject,
			&r.Type,
			&r.Issue,
			&r.Description,
			&isSolvedInt,
			&r.Created_at,
		)
		if err != nil {
			return nil, err
		}

		r.Is_solved = isSolvedInt != 0
		reports = append(reports, r)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reports, nil
}

func Insert_report_info(report Report) (int, error) {
	db := database.Get_DB()

	query := `
		INSERT INTO report (user_id, type_id, email, subject ,  type, issue, description)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	result, err := db.Exec(
		query,
		report.User_id,
		report.Type_id,
		strings.TrimSpace(report.Email),
		strings.TrimSpace(report.Subject),
		report.Type,
		report.Issue,
		strings.TrimSpace(report.Description),
	)
	if err != nil {
		return 0, err
	}

	insertedID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(insertedID), nil
}
