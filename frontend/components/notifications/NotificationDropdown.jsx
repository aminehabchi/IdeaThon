"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, CheckCheck, Trash2, Trophy, Flag, FileText, X, Rocket, Clock, Sparkles } from "lucide-react";
import { fetcher, timeAgo } from "@/lib/helpers";
import { toast } from "sonner";
import Link from "next/link";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch unread count on mount and periodically
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetcher({
        url: "/api/notifications/unread-count",
        method: "GET",
        token: null,
        returned_status: 200,
      });
      setUnreadCount(response.count || 0);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetcher({
        url: "/api/notifications/get",
        method: "POST",
        data: { limit: 20, offset: 0 },
        token: null,
        returned_status: 200,
      });
      setNotifications(response || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await fetcher({
        url: "/api/notifications/mark-read",
        method: "PUT",
        data: { notification_id: notificationId },
        token: null,
        returned_status: 204,
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetcher({
        url: "/api/notifications/mark-all-read",
        method: "PUT",
        token: null,
        returned_status: 204,
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const deleteNotification = async (notificationId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await fetcher({
        url: `/api/notifications/delete?notification_id=${notificationId}`,
        method: "DELETE",
        token: null,
        returned_status: 204,
      });

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      // Update unread count if the deleted notification was unread
      const deletedNotification = notifications.find(n => n.id === notificationId);
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      toast.success("Notification deleted");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "winner":
        return (
          <div className="p-2 bg-yellow-50 rounded-full">
            <Trophy className="w-4 h-4 text-yellow-600" />
          </div>
        );
      case "new_ideathon":
        return (
          <div className="p-2 bg-purple-50 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
        );
      case "new_entry":
        return (
          <div className="p-2 bg-blue-50 rounded-full">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
        );
      case "deadline":
        return (
          <div className="p-2 bg-orange-50 rounded-full">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
        );
      case "report":
        return (
          <div className="p-2 bg-red-50 rounded-full">
            <Flag className="w-4 h-4 text-red-600" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-50 rounded-full">
            <Bell className="w-4 h-4 text-gray-600" />
          </div>
        );
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.is_read) {
      try {
        await fetcher({
          url: "/api/notifications/mark-read",
          method: "PUT",
          data: { notification_id: notification.id },
          token: null,
          returned_status: 204,
        });
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-base font-medium text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="p-4 bg-gray-50 rounded-full mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm font-medium">No notifications yet</p>
                <p className="text-gray-500 text-xs mt-1">We'll notify you when something happens</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 transition-colors ${
                      !notification.is_read ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {notification.link ? (
                      <Link
                        href={notification.link}
                        onClick={() => handleNotificationClick(notification)}
                        className="block"
                      >
                        <NotificationContent
                          notification={notification}
                          getNotificationIcon={getNotificationIcon}
                          markAsRead={markAsRead}
                          deleteNotification={deleteNotification}
                        />
                      </Link>
                    ) : (
                      <NotificationContent
                        notification={notification}
                        getNotificationIcon={getNotificationIcon}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationContent({ notification, getNotificationIcon, markAsRead, deleteNotification }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-snug">{notification.title}</p>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-2">{timeAgo(notification.created_at)}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {!notification.is_read && (
          <button
            onClick={(e) => markAsRead(notification.id, e)}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            title="Mark as read"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={(e) => deleteNotification(notification.id, e)}
          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
