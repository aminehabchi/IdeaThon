package ideathons

import (
	"errors"
	middle "ideaThon/middleware"
	"ideaThon/utils"
	"net/http"
	"strconv"
)

func Add_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	var ideathon Ideathons
	var err error
	var ok bool

	ideathon.User_id, ok = r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	if err = utils.Decode(r, &ideathon); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if err = ideathon.Check_ideathons_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if err = Insert_ideathons_info(ideathon); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func Delete_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	ideathon_id, err := strconv.Atoi(r.FormValue("ideathon_id"))
	if err != nil || ideathon_id <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid ideathon_id"))
		return
	}

	err = Delete_ideathon(ideathon_id, user_id)
	if err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Update_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	var ideathon Ideathons
	var err error

	if err = utils.Decode(r, &ideathon); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	err = Update_ideathon(user_id, ideathon)
	if err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
