package ideathons

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func Get_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		user_id = 0
	}

	var params I_params

	if err := utils.Decode(r, &params); err != nil {
		fmt.Println("Decode", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if params.User_id == -1 {
		params.User_id = user_id
	}

	query, args := Prepare_ideathon_query(params, user_id)

	ideathons, err := Get_ideathons_Db(query, args)
	if err != nil {
		log.Println("Get_ideathons_Db", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = utils.Encode(w, ideathons)
	if err != nil {
		log.Println("Encode", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}

func Add_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	var ideathon Ideathons
	var err error
	ideathon.Owner.ID = r.Context().Value(middle.UserIDKey).(int)

	if err = utils.Decode(r, &ideathon); err != nil {
		fmt.Println(err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body (json)"))
		return
	}

	// if err = ideathon.Check_ideathons_info(); err != nil {
	// 	utils.SendResponseStatus(w, http.StatusBadRequest, err)
	// 	return
	// }

	ideathons_id, err := Insert_ideathons_info(ideathon)
	if err != nil {
		fmt.Println(err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	err = Insert_categories(ideathons_id, ideathon.Category)
	if err != nil {
		fmt.Println(err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	utils.Respond_with_id(w, http.StatusCreated, ideathons_id)
}

func Delete_ideathons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
		return
	}

	user_id := r.Context().Value(middle.UserIDKey).(int)

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

	user_id := r.Context().Value(middle.UserIDKey).(int)

	var ideathon Ideathons
	var err error

	if err = utils.Decode(r, &ideathon); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if err = ideathon.Check_ideathons_info(); err != nil {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	if err = Update_ideathon(user_id, ideathon); err != nil {
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
