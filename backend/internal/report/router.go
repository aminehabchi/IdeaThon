package report

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/report/add", Add_report)
	mux.HandleFunc("/api/report/get", Get_report)
}

