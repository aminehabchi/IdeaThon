package main

import (
	"fmt"
	database "ideaThon/config"
	middle "ideaThon/middlewares"
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
		Handler: middle.CORS(mux.Routes()),
	}

	fmt.Println("Server started on ")
	log.Println(config.ListenAndServe())
}
