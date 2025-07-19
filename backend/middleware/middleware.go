package middleware

import (
	"context"
	"errors"
	"ideaThon/utils"
	"net/http"
)

type contextKey string

const UserIDKey contextKey = "userID"

func Auth_middle_ware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := utils.Get_token_from_session(r)
		if err != nil {
			utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("missing or invalid session token"))
			return
		}

		id, err := utils.Get_id_from_session(token)
		if err != nil {
			utils.SendResponseStatus(w, http.StatusUnauthorized, errors.New("unauthorized: session not found or expired"))
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, id)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}

func CORS_middle_ware(next http.Handler) http.Handler {
	allowedOrigins := map[string]bool{
		"http://localhost:3000":     true,
		"https://your-frontend.com": true,
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
