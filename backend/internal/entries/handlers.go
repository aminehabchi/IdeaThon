package entries

import (
	"errors"
	"fmt"
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

	user_id := r.Context().Value(middle.UserIDKey).(int)

	var err error
	var entrie Entries
	entrie.User_id = user_id
	if err = utils.Decode(r, &entrie); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	// if err = entrie.Check_entries_info(); err != nil {
	// 	utils.SendResponseStatus(w, http.StatusBadRequest, err)
	// 	return
	// }
	entrie_id, err := Insert_entries(entrie)
	if err != nil {
		fmt.Println(err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, entrie_id)
}

func Delete_entrie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id := r.Context().Value(middle.UserIDKey).(int)

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

	user_id := r.Context().Value(middle.UserIDKey).(int)

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
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	// user_id := r.Context().Value(middle.UserIDKey).(int)

	var params Params
	if err := utils.Decode(r, &params); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid Request Body"))
		return
	}

	query, args := Prepare_entries_query(params)

	entries, err := Get_entries_Db(query, args)
	if err != nil {
		fmt.Println("Get_entries_Db", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
	err = utils.Encode(w, entries)
	if err != nil {
		fmt.Println("Encode", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	// w.WriteHeader(http.StatusCreated)
}
