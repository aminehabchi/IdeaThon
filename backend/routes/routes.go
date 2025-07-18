package routes

import (
	"ideaThon/internal/auth"
	"net/http"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	auth.Routes(mux)

	return mux

}
