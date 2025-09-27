"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell, User, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileDropdown from "./profileDropdown";
import NotificationDropdown from "@/components/navbarcomps/notiofications";
import { SearchBar } from "./NavSearchBar";
import { useAuth } from "@/context/AuthContext";

export function DashboardNavbar() {
  const auth = useAuth();
  const user = auth?.user;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-gray-200 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/ideas" className="flex items-center">
              <img src="/Logo.svg" alt="logo" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right: Create + Notifications + Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/create">
            <Button className="bg-transparent shadow-none border border-transparent
                   text-black flex items-center space-x-2 cursor-pointer
                   hover:bg-gray-100 hover:border-gray-300
                   transition-all duration-200">

                <PenLine className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>

            <NotificationDropdown />

            <div className="flex items-center space-x-4 mt-3">
              <ProfileDropdown
                userImage={
                  user?.avatar
                    ? `/api${user.avatar}`
                    : "/empty_pfp.png"
                }
                userName={`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
                userEmail={user?.email ?? ""}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="flex flex-col py-4 space-y-4">
                <div className="px-2">
                  <SearchBar isMobile={true} />
                </div>

                <div className="flex flex-col space-y-3 px-2">
                  <Link href="/create">
                    <Button className="w-full bg-transparent text-black hover:bg-gray-100 flex items-center justify-center space-x-2">
                      <PenLine className="w-4 h-4" />
                      <span>Create</span>
                    </Button>
                  </Link>

                  <button className="w-full p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>

                  <button className="w-full p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
