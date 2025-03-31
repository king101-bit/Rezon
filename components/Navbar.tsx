"use client";

import { useState } from "react";
import RezonLogo from "./RezonLogo";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              {/* Hamburger icon */}
            </button>
          </div>

          {/* Centered Desktop Nav Links */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-6">
              {["Home", "Movies", "Series", "Categories", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="px-3 py-2 text-black rounded-md text-sm font-medium hover:text-[#2C8C99] transition-colors"
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Auth Buttons (right side) */}
          <div className="hidden lg:flex space-x-4">
            <Link href="/sign-up" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-md text-white text-sm font-medium"
                style={{ backgroundColor: "#2C8C99", borderColor: "#2C8C99" }}
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {["Home", "Movies", "Series", "Categories", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            >
              {item}
            </Link>
          ))}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
