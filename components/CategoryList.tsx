"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Tipe data untuk kategori
interface Category {
  _id: string;
  title: string;
  slug: string;
  img?: string;
}

// Fungsi untuk mendapatkan data kategori
const getData = async (): Promise<Category[]> => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getData();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col pb-10">
      <h1 className="m-5 text-xl font-bold pt-10">Popular Categories</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className="flex items-center gap-4 p-4 border-y-2 bg-slate-100 rounded-xl justify-center hover:bg-gray-200"
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={32}
                height={32}
                className="object-cover"
              />
            )}
            <span className="text-lg font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
