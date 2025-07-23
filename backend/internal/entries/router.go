package entries

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/entries/add", Add_entries)
	mux.HandleFunc("/api/entries/delete", Delete_entrie)
	mux.HandleFunc("/api/entries/update", Update_entrie)
	mux.HandleFunc("/api/entries/get", Get_entries)
}

