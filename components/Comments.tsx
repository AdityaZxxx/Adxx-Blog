"use client";

import Link from "next/link";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loading from "@/components/Loading";
import { format } from "date-fns";
import Image from "next/image";

interface User {
  name: string;
  image?: string;
}

interface Comment {
  _id: string;
  user?: User; // Tambahkan kemungkinan undefined
  desc: string;
  createdAt: string;
}

const fetcher = async (url: string): Promise<Comment[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    const data = await res.json();
    const error = new Error(data.message);
    throw error;
  }

  return res.json();
};

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status } = useSession();
  const { data, mutate, isLoading, error } = useSWR<Comment[]>(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!desc.trim()) return; // Pastikan komentar tidak hanya whitespace

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ desc, postSlug }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setDesc(""); // Reset input setelah berhasil
        mutate(); // Memuat ulang komentar setelah submit
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false); // Reset state pengiriman
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Comments</h1>

      {/* Bagian untuk penulisan komentar */}
      {status === "authenticated" ? (
        <div className="mb-4">
          <textarea
            value={desc}
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            onChange={(e) => setDesc(e.target.value)}
            disabled={isSubmitting}
            required
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={isSubmitting || !desc.trim()} // Validasi untuk mencegah kirim komentar kosong
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-blue-500 hover:underline">
          Login to write a comment
        </Link>
      )}

      {/* Bagian untuk menampilkan komentar */}
      <div className="mt-4">
        {isLoading && <Loading />}
        {error && <p className="text-red-500">Failed to load comments</p>}
        {!isLoading && data?.length === 0 && <p>No comments yet.</p>}
        {data?.map((item: Comment) => (
  <div
    className="flex gap-4 mb-4 p-4 border-b border-gray-200"
    key={item._id}
  >
    {/* Pengecekan untuk item.user dan item.user.name */}
    {item.user && (
      <div className="flex items-start gap-4">
        {/* Tambahkan gambar profil */}
                        <Image
                            width={24}
                            height={24}
          src={item.user.image || "/default-avatar.png"} // Gambar default jika user.image tidak ada
          alt={item.user.name || "Anonymous"}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">
              {item.user.name || "Anonymous"}
            </span>
            <span className="text-gray-500 text-sm">
              {format(new Date(item.createdAt), "dd MMM yyyy, HH:mm")}
            </span>
          </div>
          <p className="text-gray-700">{item.desc}</p>
        </div>
      </div>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default Comments;
