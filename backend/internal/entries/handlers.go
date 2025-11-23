package entries

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"ideaThon/config"
	middle "ideaThon/middlewares"
	"ideaThon/internal/notifications"
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

	// Get ideathon owner and description for notification
	log.Printf("[ENTRIES] Attempting to send notification for entry submission. IdeathonID: %d, SubmitterID: %d", entrie.Ideathon_id, userID)

	var ownerID int
	var ideathonDescription string
	err = config.DATABASE.QueryRow(
		"SELECT user_id, description FROM ideathons WHERE id = ?",
		entrie.Ideathon_id,
	).Scan(&ownerID, &ideathonDescription)

	if err != nil {
		log.Printf("[ENTRIES] Failed to get ideathon owner: %v", err)
	} else {
		log.Printf("[ENTRIES] Found ideathon owner: %d (submitter: %d)", ownerID, userID)
	}

	if err == nil && ownerID != userID {
		log.Printf("[ENTRIES] Owner is different from submitter, proceeding with notification")

		// Get submitter name
		var firstName, lastName sql.NullString
		err = config.DATABASE.QueryRow(
			"SELECT first_name, last_name FROM users WHERE id = ?",
			userID,
		).Scan(&firstName, &lastName)

		submitterName := "Someone"
		if err == nil {
			if firstName.Valid && lastName.Valid {
				submitterName = firstName.String + " " + lastName.String
			} else if firstName.Valid {
				submitterName = firstName.String
			}
		}

		log.Printf("[ENTRIES] Submitter name: %s", submitterName)

		// Extract title from ideathon description JSON
		ideathonTitle := "your ideathon"
		if ideathonDescription != "" {
			var descData map[string]interface{}
			if err := json.Unmarshal([]byte(ideathonDescription), &descData); err == nil {
				if doc, ok := descData["document"].(map[string]interface{}); ok {
					if title, ok := doc["title"].(string); ok && title != "" {
						ideathonTitle = title
					}
				}
			}
		}

		log.Printf("[ENTRIES] Ideathon title: %s", ideathonTitle)
		log.Printf("[ENTRIES] Calling NotifyNewEntry goroutine")

		// Send notification asynchronously
		go notifications.NotifyNewEntry(entrie.Ideathon_id, ideathonTitle, submitterName, ownerID)
	} else if err == nil && ownerID == userID {
		log.Printf("[ENTRIES] Skipping notification: submitter is the owner")
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
