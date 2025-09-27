"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = ["Articles", "About", "Contact"];

  return (
    <header className="border-b border-gray-200 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Nav */}
            {/* <h1 className="text-xl font-bold text-black">IdeaThons</h1> */}
             <Link href="/" className="flex items-center">
                <img src="/Logo.svg" alt="logo" />
             </Link>

            {/* Desktop Nav */}
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
               <Link
               key={item}
               href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
               className="text-gray-600 hover:text-black transition-colors"
             >
               {item}
             </Link>             
              ))}
            </nav>
          </div>

          {/* Right: Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-black text-white hover:bg-gray-800">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none transition"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col mt-4 space-y-3 pb-4">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {item}
                    </Link>

                  ))}
                </nav>
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-black"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      Sign Up
                    </Button>
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
