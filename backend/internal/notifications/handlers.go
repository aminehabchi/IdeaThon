package notifications

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	middle "ideaThon/middlewares"
	"ideaThon/utils"
)

// GetNotificationsHandler retrieves notifications for the authenticated user
func GetNotificationsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	var params GetNotificationsParams
	if err := utils.Decode(r, &params); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	// Override user_id from token to prevent users from accessing others' notifications
	params.UserID = userID

	// Set default limit if not provided
	if params.Limit == 0 {
		params.Limit = 20
	}

	notifications, err := GetNotifications(params)
	if err != nil {
		log.Printf("Failed to get notifications: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	if notifications == nil {
		notifications = []Notification{}
	}

	err = utils.Encode(w, notifications)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}

// MarkAsReadHandler marks a notification as read
func MarkAsReadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	var req MarkAsReadRequest
	if err := utils.Decode(r, &req); err != nil {
		log.Printf("Failed to decode request body: %v", err)
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid request body"))
		return
	}

	if req.NotificationID == 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("notification_id is required"))
		return
	}

	err := MarkAsRead(req.NotificationID, userID)
	if err != nil {
		log.Printf("Failed to mark notification as read: %v", err)
		if err.Error() == "notification not found or unauthorized" {
			utils.SendResponseStatus(w, http.StatusNotFound, err)
		} else {
			utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// MarkAllAsReadHandler marks all notifications as read for the authenticated user
func MarkAllAsReadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	err := MarkAllAsRead(userID)
	if err != nil {
		log.Printf("Failed to mark all notifications as read: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// DeleteNotificationHandler deletes a notification
func DeleteNotificationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	notificationIDStr := r.URL.Query().Get("notification_id")
	if notificationIDStr == "" {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("notification_id query parameter is required"))
		return
	}

	notificationID, err := strconv.Atoi(notificationIDStr)
	if err != nil || notificationID <= 0 {
		utils.SendResponseStatus(w, http.StatusBadRequest, errors.New("invalid notification_id"))
		return
	}

	err = DeleteNotification(notificationID, userID)
	if err != nil {
		log.Printf("Failed to delete notification: %v", err)
		if err.Error() == "notification not found or unauthorized" {
			utils.SendResponseStatus(w, http.StatusNotFound, err)
		} else {
			utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		}
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// GetUnreadCountHandler gets the count of unread notifications
func GetUnreadCountHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.SendResponseStatus(w, http.StatusMethodNotAllowed, errors.New("method not allowed"))
		return
	}

	userID, ok := r.Context().Value(middle.UserIDKey).(int)
	if !ok {
		log.Printf("Failed to get user ID from context")
		utils.SendResponseStatus(w, http.StatusInternalServerError, errors.New("authentication error"))
		return
	}

	count, err := GetUnreadCount(userID)
	if err != nil {
		log.Printf("Failed to get unread count: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}

	response := map[string]int{"count": count}
	err = utils.Encode(w, response)
	if err != nil {
		log.Printf("Failed to encode response: %v", err)
		utils.SendResponseStatus(w, http.StatusInternalServerError, err)
		return
	}
}
