package main

import (
	"fmt"
	database "ideaThon/config"
	middle "ideaThon/middleware"
	mux "ideaThon/routes"
	"log"
	"net/http"
)

func main() {
	err := database.Setup_DB()
	if err != nil {
		log.Println(err)
		return
	}

	config := http.Server{
		Addr:    ":8080",
		Handler: middle.CORS_middle_ware(mux.Routes()),
	}

	fmt.Println("Server started on http://localhost:8080")
	log.Println(config.ListenAndServe())
}
