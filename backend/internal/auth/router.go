package auth

import (
	"net/http"

	middle "ideaThon/middlewares"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/auth/login", Login)
	mux.HandleFunc("/api/auth/register", Register)
	mux.Handle("/api/auth/me", middle.Auth(Me))
	mux.HandleFunc("/api/auth/logout", Logout)
}
