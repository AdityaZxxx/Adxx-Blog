import Link from "next/link";
import React from "react";

const MenuCategories = () => {
  return (
    <div className="flex flex-wrap gap-4">
          <Link
        href="/blog?cat=Style"
        className="px-4 py-2 text-black border-y-2 bg-pink-100 font-medium rounded-lg hover:bg-pink-400 transition"
      >
        Style
      </Link>
      <Link
        href="/blog?cat=fashion"
        className="px-4 py-2 text-black border-y-2 bg-purple-100 font-medium rounded-lg hover:bg-purple-400 transition"
      >
        Fashion
      </Link>
      <Link
        href="/blog?cat=Food"
        className="px-4 py-2 text-black bg-green-100 font-medium rounded-lg hover:bg-green-400 border-y-2 transition"
      >
        Food
      </Link>
      <Link
        href="/blog?cat=Travel"
        className="px-4 py-2 text-black bg-blue-100 font-medium rounded-lg hover:bg-blue-400 border-y-2 transition"
      >
        Travel
      </Link>
      <Link
        href="/blog?cat=Culture"
        className="px-4 py-2 text-black bg-orange-100 font-medium rounded-lg hover:bg-orange-400 border-t-2 transition"
      >
        Culture
      </Link>
      <Link
        href="/blog?cat=Coding"
        className="px-4 py-2 text-black bg-teal-100 font-medium rounded-lg hover:bg-teal-400 border-y-2 transition"
      >
        Coding
      </Link>
    </div>
  );
};

export default MenuCategories;
