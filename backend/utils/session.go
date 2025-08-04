package utils

import (
	"database/sql"
	"errors"
	database "ideaThon/config"
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

func Get_id_from_session(token string) (int, error) {
	var id int

	db := database.Get_DB()
	query := "SELECT user_id FROM sessions WHERE token = ?"

	err := db.QueryRow(query, token).Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, errors.New("invalid or expired session token")
		}
		return 0, err
	}

	return id, nil
}

