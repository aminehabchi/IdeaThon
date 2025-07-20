package report

import (
	"errors"
	middle "ideaThon/middlewares"
	"ideaThon/utils"
	"net/http"
)

func Add_report(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	var report Report
	var err error

	if err = utils.Decode(r, &report); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	report.User_id = r.Context().Value(middle.UserIDKey).(int)

	if err = report.Check_report_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	report_id, err := Insert_report_info(report)
	if err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, report_id)
}
func Get_report(w http.ResponseWriter, r *http.Request) {

}
