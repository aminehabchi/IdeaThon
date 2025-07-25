"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetcher } from "@/lib/helpers";

export function SearchBar({ className = "", isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [ideathons, setIdeathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputFocus = () => setIsOpen(true);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setIsOpen(true)
  }

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        setUsers([]);
        setIdeathons([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetcher({
          url: "http://localhost:8080/api/ideathons/get",
          method: "POST",
          data: { search: searchQuery },
          returned_status: 200,
        });

        setUsers(data.users || []);
        setIdeathons(data.ideathons || []);
      } catch (error) {
        console.error("Search error:", error);
        setUsers([]);
        setIdeathons([]);
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


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
          className="block w-full pl-10 pr-16 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:bg-white transition-all"
        />
        {!isMobile && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <kbd className="px-2 py-0.5 text-xs font-semibold bg-gray-100 border rounded">Ctrl</kbd>
              <kbd className="px-2 py-0.5 text-xs font-semibold bg-gray-100 border rounded">K</kbd>
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
              {loading && (
                <div className="text-center py-6 text-sm text-gray-500">Searching...</div>
              )}

              {!loading && users.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Users</h3>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <img
                          src={user.avatar || "/default_avatar.png"}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.first_name} {user.last_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!loading && ideathons.length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Ideathons</h3>
                  <div className="space-y-2">
                    {ideathons.map((idea) => (
                      <div
                        key={idea.id}
                        className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                          🧠
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{idea.description}</p>
                          <p className="text-xs text-gray-500">Ends on {idea.end_date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!loading && searchQuery && users.length === 0 && ideathons.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}

              {!searchQuery && !loading && users.length === 0 && (
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
