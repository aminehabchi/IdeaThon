"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export  default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notifications data
  const notifications =[]
  //   {
  //     id: 1,
  //     avatar: "/belmaayo_avatar.png", // You can replace with actual avatar URLs
  //     name: "Congrats!",
  //     message: "you won Ideathon reimagining the future of robotics",
  //     time: "15min ago",
  //     isRead: false
  //   },
  //   {
  //     id: 2,
  //     avatar: "/belmaayo_avatar.png",
  //     name: "Yahya",
  //     message: "gave an idea on reimagining the idea of things in the future",
  //     time: "15min ago",
  //     isRead: false
  //   },
  //      {
  //     id: 3,
  //     avatar: "/belmaayo_avatar.png",
  //     name: "Yahya",
  //     message: "gave an idea on reimagining the idea of things in the future",
  //     time: "15min ago",
  //     isRead: false
  //   },
  //      {
  //     id: 4,
  //     avatar: "/belmaayo_avatar.png",
  //     name: "Yahya",
  //     message: "gave an idea on reimagining the idea of things in the future",
  //     time: "15min ago",
  //     isRead: false
  //   },
  //       {
  //     id: 5,
  //     avatar: "/belmaayo_avatar.png",
  //     name: "Yahya",
  //     message: "gave an idea on reimagining the idea of things in the future",
  //     time: "15min ago",
  //     isRead: false
  //   },    {
  //     id: 6,
  //     avatar: "/belmaayo_avatar.png",
  //     name: "Yahya",
  //     message: "gave an idea on reimagining the idea of things in the future",
  //     time: "15min ago",
  //     isRead: false
  //   }
  // ];
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={toggleDropdown}
        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {/* Notification badge */}
        {notifications && notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <Link href={`/profile/${notification.id}`}>
                      <Image
                        src={notification.avatar}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                      />
                      </Link>
                      
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-900">
                          {notification.name}
                        </span>
                        <span className="text-gray-600 ml-1">
                          {notification.message}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}