package auth

import (
	"ideaThon/utils"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
}

func Register(w http.ResponseWriter, r *http.Request) {
	var user User
	var err error

	if err = utils.Decode(r, &user); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
	}

	if err = user.Check_register_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	user.Password, err = utils.Hash_password(user.Password)
	if err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	if err = Insert_user_info(user); err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func CheckAuth(w http.ResponseWriter, r *http.Request) {
}

func Logout(w http.ResponseWriter, r *http.Request) {
}
