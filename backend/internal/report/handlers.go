package report

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Toggle_report_solved(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(r.FormValue("report_id"))
	if id <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid in report id"))
		return
	}

	if err := Update_solved_status(id); err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("invalid in report id"))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func Get_Info(w http.ResponseWriter, r *http.Request) {
	info, err := Get_info()
	if err != nil {
		log.Println("Get_info ", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
	info.Content_removed = -1

	err = utils.Encode(w, info)
	if err != nil {
		log.Println("Encode", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}

func Add_report(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var report Report
	var err error

	if err = utils.Decode(r, &report); err != nil {
		log.Println("Decode", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}
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
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var filter Filter
	var err error

	if err = utils.Decode(r, &filter); err != nil {
		log.Println("Decode", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	query, args := Prepare_report_query(filter)

	reports, err := GetReports(query, args)
	if err != nil {
		log.Println("GetReports", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = utils.Encode(w, reports)
	if err != nil {
		log.Println("Encode", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}
