import React from "react";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
    return (
      <div className="flex flex-wrap items-center justify-between h-24 px-4">
            <div className="flex gap-4 ">
                <Link href="https://x.com/adxxya30" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={24} />
                </Link>
                <Link href="https://www.tiktok.com/@adxxlenathea" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={24} href="/https://www.tiktok.com/@adxxlenathea"/>
                </Link>
                <Link href="https://github.com/AdityaZxxx" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} href="/https://github.com/AdityaZxxx"/>
                </Link>
                <Link href="https://www.instagram.com/adxxya30" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} href="/https://www.instagram.com/adxxya30"/>
                </Link>
        </div>
        <div className="text-4xl font-bold">AdxxBlog</div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Link href="/" className="text-xl">
            Home
          </Link>
          <Link href="/contact" className="text-xl">
            Contact
          </Link>
          <Link href="/about" className="text-xl">
            About
          </Link>
          <AuthLinks />
        </div>
      </div>
    );
  };

  export default Navbar;
