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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
