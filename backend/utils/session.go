package utils

import (
	"net/http"
	"time"
)

const SessionCookieName = "token"

func Add_session(w http.ResponseWriter, token string) {
	expiration := time.Now().Add(24 * time.Hour)

	http.SetCookie(w, &http.Cookie{
		Name:     SessionCookieName,
		Value:    token,
		Expires:  expiration,
		HttpOnly: true,
		Path:     "/",
	})
}

func Delete_session(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     SessionCookieName,
		Value:    "",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
		Path:     "/",
	})
}

func Update_session(w http.ResponseWriter, new_token string) {
	expiration := time.Now().Add(24 * time.Hour)

	http.SetCookie(w, &http.Cookie{
		Name:     SessionCookieName,
		Value:    new_token,
		Expires:  expiration,
		HttpOnly: true,
		Path:     "/",
	})
}

func Get_token_from_session(r *http.Request) (string, error) {
	cookie, err := r.Cookie(SessionCookieName)
	if err != nil {
		return "", err
	}
	return cookie.Value, nil
}
