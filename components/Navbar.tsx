"use client"

import { useState } from "react";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between h-24 px-4">
      {/* Social Icons */}
      <div className="hidden md:flex gap-4">
        <Link href="https://x.com/adxxya30" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={24} />
        </Link>
        <Link href="https://www.tiktok.com/@adxxlenathea" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={24} />
        </Link>
        <Link href="https://github.com/AdityaZxxx" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </Link>
        <Link href="https://www.instagram.com/adxxya30" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </Link>
      </div>

      {/* Blog Name */}
      <div className="text-4xl font-bold text-center flex-1">AdxxBlog</div>
<div className="px-5">
<ThemeToggle /></div>
      {/* Links */}
      <div className="hidden md:flex items-center gap-5 text-xl ">
        <Link href="/" className="text-xl  hover:text-gray-500">
          Home
        </Link>
        <Link href="/contact" className="text-xl hover:text-gray-500">
          Contact
        </Link>
        <Link href="/about" className="text-xl hover:text-gray-500">
          About
        </Link>
              <AuthLinks />
      </div>

      {/* Hamburger Menu */}
          <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute z-50 mb-4 top-24 right-0 w-full bg-white font-medium dark:bg-[#121836]  shadow-md md:hidden">
          <div className="flex flex-col items-center gap-5 py-4">
            <Link href="/" className="text-xl hover:text-gray-500" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/contact" className="text-xl hover:text-gray-500" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/about" className="text-xl hover:text-gray-500" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <AuthLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
