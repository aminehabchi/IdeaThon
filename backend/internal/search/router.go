package search

import "net/http"

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/search", SearchHandler)
}
