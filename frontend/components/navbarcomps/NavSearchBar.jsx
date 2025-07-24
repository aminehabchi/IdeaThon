"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data - replace with your actual data
const mockUsers = [
  {
    id: 1,
    name: "Randall Johnsson",
    status: "Active now",
    avatar: "/belmaayo_avatar.png"
  },
  {
    id: 2,
    name: "Randall Johnsson",
    status: "Active now",
    avatar: "/belmaayo_avatar.png"
  }
];

const mockIdeathons = [
  {
    id: 1,
    title: "Reimagine Grocery Shopping for Busy",
    author: "By Asana",
    daysLeft: "5 Days Left",
    participants: "4985",
    image: "/belmaayo_avatar.png"
  }
];

export function SearchBar({ className = "", isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIdeathons = mockIdeathons.filter(ideathon =>
    ideathon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={searchRef} className={`relative ${className} w-full`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Type to search .."
          className="block w-full pl-10 pr-16 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500   focus:bg-white transition-all"
        />
        {!isMobile && (
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
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-4">
              {/* Users Section */}
              {filteredUsers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Users</h3>
                  <div className="space-y-2">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideathons Section */}
              {filteredIdeathons.length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Ideathons</h3>
                  <div className="space-y-2 ">
                    {filteredIdeathons.map((ideathon) => (
                      <div
                        key={ideathon.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <img
                          src={ideathon.image}
                          alt={ideathon.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ideathon.title}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              {/* <div className="w-1 h-1 bg-pink-500 rounded-full"></div> */}
                              <img src="./belmaayo_avatar.png" alt="author avatar" className="h-4 w-4 rounded-full"/>
                              <span>{ideathon.author}</span>
                            </span>
                            <span>{ideathon.daysLeft}</span>
                            <span>{ideathon.participants}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchQuery && filteredUsers.length === 0 && filteredIdeathons.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}

              {/* Default state when no search query */}
              {!searchQuery &&  filteredUsers.length === 0  && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Start typing to search users and ideathons</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}