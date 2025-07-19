"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Plus, Bell, User, PenLine } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardNavbar() {
  const [searchFocused, setSearchFocused] = useState(false);

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

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <motion.input
                type="text"
                placeholder="Type to search .."
                className="block w-full pl-10 pr-16 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 transition-all"
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
          <div className="flex items-center space-x-4">
            {/* Create Button */}
            <Link href="/create">
              <Button className="bg-transparent text-black hover:bg-gray-100 flex items-center space-x-2 cursor-pointer">
                {/* <Plus className="w-4 h-4" /> */}
                <PenLine className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile Avatar */}

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
      </div>
    </header>
  );
}