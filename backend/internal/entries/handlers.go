package entries

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Add_entries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var err error
	var entrie Entries

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}
	entrie.User_id = userID

	if err = utils.Decode(r, &entrie); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if err = entrie.Check_entries_info(); err != nil {
		log.Printf("Entry validation failed: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	entrie_id, err := Insert_entries(entrie)
	if err != nil {
		log.Printf("Failed to insert entry: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, entrie_id)
}

func Delete_entrie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	entries_id, err := strconv.Atoi(r.FormValue("entries_id"))
	if err != nil || entries_id <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid entries id"))
		return
	}

	if err = Delete_entrie_DB(user_id, entries_id); err != nil {
		log.Printf("Failed to delete entry %d: %v", entries_id, err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Update_entrie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	var err error
	var entrie Entries
	entrie.User_id = user_id
	if err = utils.Decode(r, &entrie); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if err = entrie.Check_entries_info(); err != nil {
		log.Printf("Entry validation failed: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	if err = Update_entrie_DB(user_id, entrie); err != nil {
		log.Printf("Failed to update entry: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Get_entries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var params Params
	if err := utils.Decode(r, &params); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	query, args := Prepare_entries_query(params)

	entries, err := Get_entries_Db(query, args)
	if err != nil {
		log.Printf("Failed to get entries: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
	err = utils.Encode(w, entries)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}
