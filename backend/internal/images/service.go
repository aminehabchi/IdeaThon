package images

import (
	"encoding/base64"
	"errors"
	"ideaThon/utils"
	"os"
	"strings"
)

var imageExtensions = map[string]bool{
	".jpg":  true,
	".jpeg": true,
	".png":  true,
	".gif":  true,
	".bmp":  true,
	".webp": true,
	".tiff": true,
	".svg":  true,
}

func SaveBase64ImageToPath(imageBase64, path string) (string, error) {
	if imageBase64 == "" {
		return "", nil
	}

	uuid, err := utils.Get_token()
	if err != nil {
		return "", err
	}

	ext, err := GetImageExtensionFromBase64(imageBase64)
	if err != nil {
		return "", errors.New("failed to get image type: " + err.Error())
	}

	if !imageExtensions[ext] {
		return "", errors.New("Invalide Image Type")
	}

	if commaIndex := strings.Index(imageBase64, ","); commaIndex != -1 {
		imageBase64 = imageBase64[commaIndex+1:]
	}

	imageData, err := base64.StdEncoding.DecodeString(imageBase64)
	if err != nil {
		return "", errors.New("failed to decode base64 image: " + err.Error())
	}

	if err := os.MkdirAll(path, 0755); err != nil {
		return "", errors.New("failed to create directory: " + err.Error())
	}

	filename := uuid + ext
	fullPath := path + "/" + filename

	err = os.WriteFile(fullPath, imageData, 0644)
	if err != nil {
		return "", errors.New("failed to save image: " + err.Error())
	}

	return fullPath[2:], nil
}

func GetImageExtensionFromBase64(data string) (string, error) {
	if !strings.HasPrefix(data, "data:") {
		return "", errors.New("invalid base64 header")
	}

	headerParts := strings.SplitN(data, ";", 2)
	if len(headerParts) < 2 {
		return "", errors.New("invalid base64 format")
	}

	mimeParts := strings.SplitN(headerParts[0], "/", 2)
	if len(mimeParts) != 2 {
		return "", errors.New("could not parse MIME type")
	}

	ext := mimeParts[1]
	if ext == "jpeg" {
		ext = "jpg"
	}

	return "." + ext, nil
}
