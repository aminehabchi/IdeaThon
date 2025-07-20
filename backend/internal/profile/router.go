package profile

import (
	"net/http"
)

func RegisterProfileRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/profile", ProfileHandler)
	mux.HandleFunc("/api/update_profile", UpdateProfile)
}
