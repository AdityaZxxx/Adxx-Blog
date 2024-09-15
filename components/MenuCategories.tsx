import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuCategories = () => {
  return (
    <div className="flex flex-wrap gap-4">
        <Image src={"/p1.jpg"} alt="" width={24} height={24} />
          <Link
        href="/blog?cat=style"
        className="px-4 py-2 text-black bg-pink-100 font-medium rounded-lg hover:bg-pink-600 transition"
      >
        Style
      </Link>
      <Link
        href="/blog?cat=fashion"
        className="px-4 py-2 text-black bg-purple-100 font-medium rounded-lg hover:bg-purple-600 transition"
      >
        Fashion
      </Link>
      <Link
        href="/blog?cat=food"
        className="px-4 py-2 text-black bg-green-100 font-medium rounded-lg hover:bg-green-600 transition"
      >
        Food
      </Link>
      <Link
        href="/blog?cat=travel"
        className="px-4 py-2 text-black bg-blue-100 font-medium rounded-lg hover:bg-blue-600 transition"
      >
        Travel
      </Link>
      <Link
        href="/blog?cat=culture"
        className="px-4 py-2 text-black bg-orange-100 font-medium rounded-lg hover:bg-orange-600 transition"
      >
        Culture
      </Link>
      <Link
        href="/blog?cat=coding"
        className="px-4 py-2 text-black bg-teal-100 font-medium rounded-lg hover:bg-teal-600 transition"
      >
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
