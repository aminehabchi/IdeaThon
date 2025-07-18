package utils

import (
	"encoding/json"
	"net/http"
)

func Decode(r *http.Request, receiver any) error {
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	return decoder.Decode(receiver)
}

func Encode(w http.ResponseWriter, data any) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(data)
}
