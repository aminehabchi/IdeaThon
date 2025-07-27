package profile

import (
	"net/http"

	middle "ideaThon/middlewares"
)

func RegisterProfileRoutes(mux *http.ServeMux) {
	mux.Handle("/api/profile/get", middle.Auth(Get_profile))
	mux.Handle("/api/profile/searsh", middle.Auth(Srearsh_profile))
	mux.Handle("/api/updateprofile", middle.Auth(UpdateProfile))
}
