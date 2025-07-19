package ideathons

import (
	"errors"
	"ideaThon/utils"
	"net/http"
)

func Add_ideathons(w http.ResponseWriter, r *http.Request) {
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

	

	w.WriteHeader(http.StatusCreated)
}

func Delete_ideathons(w http.ResponseWriter, r *http.Request) {}

func Update_ideathons(w http.ResponseWriter, r *http.Request) {}
