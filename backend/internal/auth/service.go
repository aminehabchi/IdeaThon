package auth

import (
	"errors"
	"net/http"
	"regexp"
	"strings"

	"ideaThon/utils"
)

func Update_session(w http.ResponseWriter, id int) error {
	token, err := utils.Get_token()
	if err != nil {
		return err
	}

	err = Insert_session(id, token)
	if err != nil {
		return err
	}

	utils.Add_session(w, token)
	return nil
}

func (u *User) Check_register_info() error {
	u.FirstName = strings.TrimSpace(u.FirstName)
	if u.FirstName == "" {
		return errors.New("first name is required")
	}

	u.LastName = strings.TrimSpace(u.LastName)
	if u.LastName == "" {
		return errors.New("last name is required")
	}

	u.Email = strings.TrimSpace(u.Email)
	if u.Email == "" {
		return errors.New("email is required")
	}

	u.Password = strings.TrimSpace(u.Password)
	if u.Password == "" {
		return errors.New("password is required")
	}

	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)
	if !emailRegex.MatchString(strings.ToLower(u.Email)) {
		return errors.New("invalid email format")
	}

	if len(u.Password) < 6 {
		return errors.New("password must be at least 6 characters")
	}

	return nil
}

func (u *User) Check_login_info() error {
	u.Email = strings.TrimSpace(u.Email)
	if u.Email == "" {
		return errors.New("email is required")
	}

	u.Password = strings.TrimSpace(u.Password)
	if u.Password == "" {
		return errors.New("password is required")
	}

	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)
	if !emailRegex.MatchString(strings.ToLower(u.Email)) {
		return errors.New("invalid email format")
	}

	if len(u.Password) < 6 {
		return errors.New("password must be at least 6 characters")
	}

	return nil
}
