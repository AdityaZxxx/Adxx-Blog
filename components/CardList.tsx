"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import Loading from "@/components/Loading";

// Tipe untuk post
interface Post {
  _id: string;
  title: string;
  slug: string;
  img?: string;
  desc: string;
  createdAt: string;
  catSlug: string;
}

// Tipe untuk props
interface CardListProps {
  page: number;
  cat?: string;
}

// Fungsi untuk mengambil data dari API
const getData = async (page: number, cat?: string) => {
    const apiUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(
    `${apiUrl}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const CardList: React.FC<CardListProps> = ({ page, cat }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const POST_PER_PAGE = 5;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getData(page, cat);
        setPosts(data.posts);
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, cat]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <h1 className="">Recent Posts</h1>
      <div className="">
        {posts.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
