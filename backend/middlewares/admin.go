package middleware

import (
	"errors"
	"log"
	"net/http"

	"ideaThon/utils"
)

func Admin(next func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user_id, ok := r.Context().Value(UserIDKey).(int)
		if !ok {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		role, err := utils.Check_is_admin(user_id)
		if err != nil {
			log.Println("error--:", err)
			utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("Error while checking admin role"))
			return
		}

		if !role {
			log.Println("User is not an admin:", user_id)
			utils.SendResponseStatus(w, http.StatusForbidden, errors.New("Forbidden: user is not an admin"))
			return
		}

		next(w, r)
	})
}
