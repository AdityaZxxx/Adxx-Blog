import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-black py-10 px-5">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="AdxxBlog" width={50} height={50} />
            <h1 className="text-2xl font-bold">AdxxBlog</h1>
          </div>
          <p className="max-w-sm text-sm text-gray-900">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            necessitatibus similique aspernatur obcaecati veritatis. Aperiam cum
            porro sequi, totam minima consequuntur, aspernatur deleniti vero
            repellendus dolores.
          </p>
          <div className="flex gap-4 mt-4">
            <FaTwitter size={24} />
            <FaTiktok size={24} />
            <FaYoutube size={24} />
            <FaInstagram size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 text-center md:text-left md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Links</span>
            <Link href="/" className="hover:underline">Homepage</Link>
            <Link href="/" className="hover:underline">Blog</Link>
            <Link href="/" className="hover:underline">About</Link>
            <Link href="/" className="hover:underline">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Tags</span>
            <Link href="/" className="hover:underline">Style</Link>
            <Link href="/" className="hover:underline">Fashion</Link>
            <Link href="/" className="hover:underline">Coding</Link>
            <Link href="/" className="hover:underline">Travel</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Social</span>
            <Link href="/" className="hover:underline">Facebook</Link>
            <Link href="/" className="hover:underline">Instagram</Link>
            <Link href="/" className="hover:underline">Tiktok</Link>
            <Link href="/" className="hover:underline">Youtube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
