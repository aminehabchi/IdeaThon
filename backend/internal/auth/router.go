package auth

import (
	"net/http"
)

func Routes(mux *http.ServeMux) {
	mux.HandleFunc("/api/auth/login", Login)
	mux.HandleFunc("/api/auth/register", Register)
	mux.HandleFunc("/api/auth/check-auth", CheckAuth)
	mux.HandleFunc("/api/auth/profile", Profile)
	mux.HandleFunc("/api/auth/logout", Logout)
}
