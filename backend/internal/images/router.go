package images

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/images/", Serve_images)
}
