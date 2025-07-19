"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Bell, User, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-gray-200 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-black">IdeaThons</h1>
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

          {/* Center: Search Bar (Hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Type to search .."
                className="block w-full pl-10 pr-16 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <kbd className="px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                    Ctrl
                  </kbd>
                  <kbd className="px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                    K
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Create Button + Notifications + Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/create">
              <Button className="bg-transparent text-black hover:bg-gray-100 flex items-center space-x-2">
                <PenLine className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>

            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            <Link href="/profile">
              <img
                src="/belmaayo_avatar.png"
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full hover:scale-105 transition-transform cursor-pointer"
              />
            </Link>
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
                {/* Mobile Search Bar */}
                <div className="px-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Type to search .."
                      className="block w-full pl-10 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Mobile Actions */}
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

                  <Link href="/profile">
                    <button className="w-full p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
