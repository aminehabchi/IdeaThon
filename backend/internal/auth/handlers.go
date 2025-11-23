package auth

import (
	"database/sql"
	"errors"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var user User
	var err error
	if err = utils.Decode(r, &user); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if err = user.Check_login_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	id, hashed_password, err := Get_password(user.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			utils.SendResponseStatus(w, http.StatusNotFound, errors.New("user not found"))
		} else {
			utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		}
		return
	}

	err = utils.Compare_password(hashed_password, user.Password)
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("incorrect password"))
		} else {
			utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		}
		return
	}

	err = Update_session(w, id)
	if err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Register(w http.ResponseWriter, r *http.Request) {
	var user User
	var err error
	if err = utils.Decode(r, &user); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if err = user.Check_register_info(); err != nil {
		log.Printf("Registration validation failed: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	user.Password, err = utils.Hash_password(user.Password)
	if err != nil {
		log.Printf("Failed to hash password: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	if err = Insert_user_info(user); err != nil {
		log.Printf("Failed to insert user: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func Me(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	info, err := Get_my_Info(userID)
	if err != nil {
		log.Printf("Failed to get user info for user %d: %v", userID, err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = utils.Encode(w, info)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	utils.Delete_session(w)
}
