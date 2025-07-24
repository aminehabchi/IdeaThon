package middleware

import (
	"context"
	"errors"
	"net/http"

	"ideaThon/utils"
)

type contextKey string

const UserIDKey contextKey = "userID"

func Auth(next func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, err := utils.Get_token_from_session(r)
		if err != nil {
			utils.SendResponseStatus(w, http.StatusUnauthorized, errors.New("missing or invalid session token"))
			return
		}

		id, err := utils.Get_id_from_session(token)
		if err != nil {
			utils.SendResponseStatus(w, http.StatusUnauthorized, errors.New("unauthorized: session not found or expired"))
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, id)
		r = r.WithContext(ctx)

		next(w, r)
	})
}
