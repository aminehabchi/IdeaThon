package routes

import (
	"ideaThon/internal/auth"
	"ideaThon/internal/images"
	"net/http"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	auth.Routes(mux)
	images.Routes(mux)
	
	return mux

}
