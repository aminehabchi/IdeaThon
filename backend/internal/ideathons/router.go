package ideathons

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/ideathons/add", Add_ideathons)
	mux.HandleFunc("/api/ideathons/delete", Delete_ideathons)
	mux.HandleFunc("/api/ideathons/update", Update_ideathons)
	mux.HandleFunc("/api/ideathons/get", Get_ideathons)
}
