package entries

import (
	middle "ideaThon/middlewares"
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("/api/entries/add", middle.Auth(Add_entries))
	mux.Handle("/api/entries/delete", middle.Auth(Delete_entrie))
	mux.Handle("/api/entries/update", middle.Auth(Update_entrie))
	mux.Handle("/api/entries/get", middle.Auth(Get_entries))
}
