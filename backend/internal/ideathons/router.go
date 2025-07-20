package ideathons

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/auth/ideathons/add", Add_ideathons)
	mux.HandleFunc("/api/auth/ideathons/delete", Delete_ideathons)
	mux.HandleFunc("/api/auth/ideathons/update", Update_ideathons)
	mux.HandleFunc("/api/auth/ideathons/get", Get_ideathons)
}
