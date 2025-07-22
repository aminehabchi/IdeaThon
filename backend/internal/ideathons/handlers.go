package ideathons

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

func PrintIdeathon(idea Ideathons) {
	fmt.Println("Id:", idea.Id)
	fmt.Println("User_id:", idea.User_id)
	fmt.Println("Description:", idea.Description)
	fmt.Println("Banner:", idea.Banner)
	fmt.Println("Price:", idea.Price)
	fmt.Println("Created_at:", idea.Created_at)
	fmt.Println("Start_date:", idea.Start_date)
	fmt.Println("End_date:", idea.End_date)
	fmt.Println("Privacy:", idea.Privacy)
	fmt.Println("")
	fmt.Println("")
}
func Get_ideathons(w http.ResponseWriter, r *http.Request) {
	// if r.Method != http.MethodGe {
	// 	utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("Method Not Allowed"))
	// 	return
	// }

	// user_id := r.Context().Value(middle.UserIDKey).(int)
	// user_id := 1

	var params I_params

	if err := utils.Decode(r, &params); err != nil {
		fmt.Println("Decode", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("Invalid request body"))
		return
	}

	query, args := Prepare_ideathon_query(params)

	ideathons, err := Get_ideathons_Db(query, args)
	if err != nil {
		fmt.Println("Get_ideathons_Db", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
	err = utils.Encode(w, ideathons)
	if err != nil {
		fmt.Println("Encode", err)
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
	// ideathon.User_id = r.Context().Value(middle.UserIDKey).(int)
	ideathon.User_id = 1
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

	user_id, _ := r.Context().Value(middle.UserIDKey).(int)

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
