import React from "react";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import ThemeToggle from "./ThemeToggle";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Navbar = () => {
    return (
      <div className="flex flex-wrap items-center justify-between h-24 px-4">
        <div className="flex gap-4 ">
          <FaTwitter size={24} />
          <FaTiktok size={24} />
          <FaYoutube size={24} />
          <FaInstagram size={24} />
        </div>
        <div className="text-4xl font-bold">AdxxBlog</div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Link href="/" className="text-xl">
            Homepage
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
