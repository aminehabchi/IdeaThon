package report

import (
	"net/http"
	middle "ideaThon/middlewares"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("/api/report/add", middle.Auth((Add_report)))
	mux.Handle("/api/report/get", middle.Auth((Get_report)))
}

