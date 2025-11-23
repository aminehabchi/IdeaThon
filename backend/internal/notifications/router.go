package notifications

import (
	"net/http"

	middle "ideaThon/middlewares"
)

func Routes(mux *http.ServeMux) {
	mux.Handle("/api/notifications/get", middle.Auth(GetNotificationsHandler))
	mux.Handle("/api/notifications/mark-read", middle.Auth(MarkAsReadHandler))
	mux.Handle("/api/notifications/mark-all-read", middle.Auth(MarkAllAsReadHandler))
	mux.Handle("/api/notifications/delete", middle.Auth(DeleteNotificationHandler))
	mux.Handle("/api/notifications/unread-count", middle.Auth(GetUnreadCountHandler))
}
