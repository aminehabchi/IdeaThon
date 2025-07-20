package entries

import (
	"errors"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Add_entries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	var err error
	var entrie Entries
	entrie.User_id = user_id
	if err = utils.Decode(r, &entrie); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid Request Body"))
		return
	}

	if err = entrie.Check_entries_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	if err = Insert_entries(entrie); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func Delete_entrie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	entries_id, err := strconv.Atoi(r.FormValue("entries_id"))
	if err != nil || entries_id <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid entries_id"))
		return
	}

	if err = Delete_entrie_DB(user_id, entries_id); err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Update_entrie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Unauthorized"))
		return
	}

	var err error
	var entrie Entries
	entrie.User_id = user_id
	if err = utils.Decode(r, &entrie); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid Request Body"))
		return
	}

	if err = entrie.Check_entries_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	if err = Update_entrie_DB(user_id, entrie); err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Get_entries(w http.ResponseWriter, r *http.Request) {
}
