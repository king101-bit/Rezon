"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import RezonLogo from "./RezonLogo";
import { Search } from "lucide-react";
import MovieSearch from "./MovieSearch";

export default function Navigation({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <RezonLogo />
            <span className="ml-2 text-xl font-bold text-black">Rezo</span>
          </Link>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Right side - conditional rendering based on auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {/* Search Bar */}
                <div className="relative">
                  <MovieSearch />
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-[#2C8C99] flex items-center justify-center text-white text-sm font-medium">
                    {user.user_metadata?.full_name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.user_metadata?.full_name || "Welcome"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-up" passHref>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-md text-white text-sm font-medium"
                    style={{
                      backgroundColor: "#2C8C99",
                      borderColor: "#2C8C99",
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>

                <Link href="/sign-in" passHref>
                  <motion.button
                    whileHover={{
                      backgroundColor: "#2C8C99",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-md text-sm font-medium border transition-colors"
                    style={{
                      backgroundColor: "transparent",
                      color: "#2C8C99",
                      borderColor: "#2C8C99",
                    }}
                  >
                    Login
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simplified without navigation items */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Search Bar (mobile) */}
          {user && (
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C8C99]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          )}

          {user ? (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-[#2C8C99] flex items-center justify-center text-white text-sm font-medium mr-2">
                  {user.user_metadata?.full_name?.charAt(0) || "U"}
                </div>
                <span className="text-sm font-medium">
                  {user.user_metadata?.full_name || "Welcome"}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <Link
                href="/sign-up"
                className="w-full px-3 py-2 rounded-md text-white font-medium block text-center"
                style={{ backgroundColor: "#2C8C99" }}
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="w-full px-3 py-2 rounded-md font-medium border block text-center"
                style={{ color: "#2C8C99", borderColor: "#2C8C99" }}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
