package report

import (
	"errors"
	"log"
	"net/http"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Add_report(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var report Report
	var err error

	if err = utils.Decode(r, &report); err != nil {
		// log.Println("Decode", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}
	// fmt.Println(report)
	report.User_id = r.Context().Value(middle.UserIDKey).(int)

	if err = report.Check_report_info(); err != nil {
		log.Println("Check_report_info ", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	report_id, err := Insert_report_info(report)
	if err != nil {
		log.Println("Insert_report_info ", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, report_id)
}

func Get_report(w http.ResponseWriter, r *http.Request) {
}
