"use client"

import React, { useEffect, useState } from "react";
import Card from "./Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/components/Loading"

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

// Fungsi untuk mengambil data dari API
const getData = async (page: number, cat?: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

// Tipe untuk props
interface CardListProps {
  page: number;
  cat?: string;
}

const CardList: React.FC<CardListProps> = ({ page, cat }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const POST_PER_PAGE = 2;
  const totalPages = Math.ceil(totalCount / POST_PER_PAGE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { posts, count } = await getData(page, cat);
        setPosts(posts);
        setTotalCount(count);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, cat]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-10 text-2xl font-bold">Recent Posts</h1>
      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
        {posts?.map((item: Post) => (
          <Card item={item} key={item._id} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Tombol Previous */}
          {hasPrev && (
            <PaginationPrevious
              href={`/posts?page=${page - 1}${cat ? `&cat=${cat}` : ""}`}
            >
              Previous
            </PaginationPrevious>
          )}

          {/* Tampilkan halaman */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === index + 1}
                href={`/posts?page=${index + 1}${cat ? `&cat=${cat}` : ""}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Tombol Next */}
          {hasNext && (
            <PaginationNext
              href={`/posts?page=${page + 1}${cat ? `&cat=${cat}` : ""}`}
            >
              Next
            </PaginationNext>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CardList;
