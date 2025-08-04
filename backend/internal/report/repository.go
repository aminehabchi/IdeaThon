package report

import (
	"strings"

	"ideaThon/config"
)

func Update_solved_status(id int) error {
	query := `UPDATE report SET is_solved = CASE WHEN is_solved = 1 THEN 0 ELSE 1 END WHERE id = ?`
	_, err := config.Get_DB().Exec(query, id)
	return err
}

func Get_info() (Info, error) {
	var info Info
	query := `
			SELECT 
		(SELECT COUNT(*) FROM report) AS total_reports,
		(SELECT COUNT(*) FROM report WHERE is_solved = 0) AS pending_reports,
		(SELECT COUNT(*) FROM users WHERE is_banned = 1) AS banned_users;`

	err := config.Get_DB().QueryRow(query).Scan(&info.Total_reports, &info.Pending_reports, &info.Users_banned)
	return info, err
}

func GetReports(query string, args []any) ([]Report, error) {
	rows, err := config.Get_DB().Query(query, args...)
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
	db := config.Get_DB()

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
