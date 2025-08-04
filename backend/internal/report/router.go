package report

import (
	"net/http"

	middle "ideaThon/middlewares"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("/api/report/add", middle.Auth((Add_report)))
	mux.Handle("/api/report/get", middle.Auth(middle.Admin(Get_report)))
	mux.Handle("/api/report/info", middle.Auth(middle.Admin(Get_Info)))
	mux.Handle("/api/report/solve", middle.Auth(middle.Admin(Toggle_report_solved)))
}
