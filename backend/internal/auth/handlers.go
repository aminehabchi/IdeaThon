package auth

import (
	"database/sql"
	"errors"
	"fmt"
	"ideaThon/utils"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var user User
	var err error
	if err = utils.Decode(r, &user); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
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
		fmt.Println("weeeeeeeeeeee")
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if err = user.Check_register_info(); err != nil {
		fmt.Println("zeeeeeeeeeeee")
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	user.Password, err = utils.Hash_password(user.Password)
	if err != nil {
		fmt.Println("feeeeeeeeeeee")
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	if err = Insert_user_info(user); err != nil {
		fmt.Println("reeeeeeeeeeee")
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {
}

func Logout(w http.ResponseWriter, r *http.Request) {
	utils.Delete_session(w)
}
