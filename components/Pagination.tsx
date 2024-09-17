"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Tipe untuk props Pagination
interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-4 py-4">
      <button
        className={`px-4 py-2 text-white bg-blue-500 rounded-md ${!hasPrev ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!hasPrev}
        onClick={() => {
          if (hasPrev) router.push(`?page=${page - 1}`);
        }}
      >
        Previous
      </button>
      <button
        className={`px-4 py-2 text-white bg-blue-500 rounded-md ${!hasNext ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!hasNext}
        onClick={() => {
          if (hasNext) router.push(`?page=${page + 1}`);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
