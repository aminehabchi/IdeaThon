package ideathons

import (
	"net/http"

	middle "ideaThon/middlewares"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("/api/ideathons/add", middle.Auth(Add_ideathons))
	mux.Handle("/api/ideathons/delete", middle.Auth(Delete_ideathons))
	mux.Handle("/api/ideathons/update", middle.Auth(Update_ideathons))
	mux.Handle("/api/ideathons/get", middle.Auth(Get_ideathons))
	mux.Handle("/api/ideathons/pick-winner", middle.Auth(PickWinner))
}
