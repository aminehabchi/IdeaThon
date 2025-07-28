package report

import (
	"strings"
	database "ideaThon/config"
)

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
