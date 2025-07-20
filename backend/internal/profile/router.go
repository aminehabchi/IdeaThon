package profile

import (
	"net/http"
)

func RegisterProfileRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/profile", ProfileHandler)
}
