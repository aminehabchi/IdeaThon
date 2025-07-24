package images

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func Serve_images(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/api/images/")
	filePath := filepath.Join("../images", path)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		http.Error(w, "Fichier introuvable", http.StatusNotFound)
		return
	}

	http.ServeFile(w, r, filePath)
}
