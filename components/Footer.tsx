import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-black py-10 px-0 border-t-4">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="AdxxBlog" width={50} height={50} className="rounded-full" />
            <h1 className="text-2xl font-bold">AdxxBlog</h1>
          </div>
          <p className="max-w-sm text-sm text-gray-900">
          Find articles about the latest trends share information likes technology, fashion, style, vacation spots, and articles about food.
          </p>
          <div className="flex gap-4 mt-4">
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
        </div>

        <div className="grid grid-cols-1 gap-6 text-center md:text-left md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Links</span>
            <Link href="/" className="hover:underline">Home</Link>
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
            <Link href="/https://x.com/adxxya30" target="_blank" rel="noopener noreferrer" className="hover:underline">X Twitter</Link>
            <Link href="/https://www.tiktok.com/@adxxlenathea" target="_blank" rel="noopener noreferrer" className="hover:underline">Tiktok</Link>
            <Link href="/https://github.com/AdityaZxxx" target="_blank" rel="noopener noreferrer" className="hover:underline">Github</Link>
            <Link href="/https://www.instagram.com/adxxya30" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
