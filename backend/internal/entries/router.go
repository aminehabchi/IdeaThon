package entries

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/auth/entries/add", Add_entries)
	mux.HandleFunc("/api/auth/entries/delete", Delete_entrie)
	mux.HandleFunc("/api/auth/entries/update", Update_entrie)
	mux.HandleFunc("/api/auth/entries/get", Get_entries)
}

