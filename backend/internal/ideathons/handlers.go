package ideathons

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Get_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		user_id = 0
	}

	var params I_params

	if err := utils.Decode(r, &params); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if params.User_id == -1 {
		params.User_id = user_id
	}

	query, args := Prepare_ideathon_query(params, user_id)

	ideathons, err := Get_ideathons_Db(query, args)
	if err != nil {
		log.Printf("Failed to get ideathons: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = utils.Encode(w, ideathons)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}

func Add_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	var ideathon Ideathons
	var err error

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}
	ideathon.Owner.ID = userID

	if err = utils.Decode(r, &ideathon); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if err = ideathon.Check_ideathons_info(); err != nil {
		log.Printf("Ideathon validation failed: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	ideathons_id, err := Insert_ideathons_info(ideathon)
	if err != nil {
		log.Printf("Failed to insert ideathon: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = Insert_categories(ideathons_id, ideathon.Category)
	if err != nil {
		log.Printf("Failed to insert categories: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, ideathons_id)
}

func Delete_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	ideathon_id, err := strconv.Atoi(r.FormValue("ideathon_id"))
	if err != nil || ideathon_id <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid ideathon_id"))
		return
	}

	err = Delete_ideathon(ideathon_id, user_id)
	if err != nil {
		log.Printf("Failed to delete ideathon %d: %v", ideathon_id, err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func Update_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	var ideathon Ideathons
	var err error

	if err = utils.Decode(r, &ideathon); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}
	if err = ideathon.Check_ideathons_info(); err != nil {
		log.Printf("Ideathon validation failed: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, err)
		return
	}

	if err = Update_ideathon(user_id, ideathon); err != nil {
		log.Printf("Failed to update ideathon: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
	log.Printf("Ideathon %d updated successfully by user %d", ideathon.Id, user_id)
	w.WriteHeader(http.StatusNoContent)
}
