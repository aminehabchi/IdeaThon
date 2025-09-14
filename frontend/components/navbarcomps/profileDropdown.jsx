"use client";

// import { useState } from "react";
import { User, Shield, Flag, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { fetcher } from "@/lib/helpers";

export default function ProfileDropdown({
  userImage = "/empty_pfp.jpeg",
  userName = "user name",
  userEmail = "user@example.com"
}) {

  const handleLogout = async () => {
    try {
      await fetcher({
        url: "/api/auth/logout",
        method: "POST",
        token: null,
        returned_status: 200,
      });

      // Clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          src={userImage || "/avatar-default.svg"}
          alt="Profile"
          className="h-8 w-8 rounded-full border-2 border-gray-300 object-cover mb-4"
        />

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-0 bg-white border border-gray-200 shadow-lg rounded-lg"
      >
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
         <img
            src={userImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">
              {userName}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/privacy-policy"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/report"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Flag className="w-4 h-4" />
              <span>Report an issue</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-0 bg-gray-100" />

        {/* Logout */}
        <div className="py-2">
          <DropdownMenuItem
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50 focus:text-red-600"
            onClick={() => {
              // Add your logout logic here
              handleLogout();
            }}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}