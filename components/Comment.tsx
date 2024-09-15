"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Definisikan tipe untuk komentar dan pengguna
interface User {
  name: string;
  image?: string;
}

interface Comment {
  _id: string;
  user: User;
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
  const { data, mutate, isLoading } = useSWR<Comment[]>(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!desc) return; // Pastikan tidak mengirim komentar kosong

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
      {status === "authenticated" ? (
        <div className="mb-4">
          <textarea
            value={desc} // Tampilkan nilai dari state desc
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
            onChange={(e) => setDesc(e.target.value)}
            disabled={isSubmitting} // Nonaktifkan input saat sedang submit
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={isSubmitting || !desc} // Nonaktifkan jika sedang submit atau input kosong
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-blue-500 hover:underline">
          Login to write a comment
        </Link>
      )}
      <div className="mt-4">
        {isLoading ? (
          "Loading..."
        ) : (
          data?.map((item: Comment) => (
            <div className="flex gap-4 mb-4 p-4 border-b border-gray-200" key={item._id}>
              {item.user.image && (
                <div className="relative w-12 h-12">
                  <Image
                    src={item.user.image}
                    alt={`${item.user.name}'s profile`}
                    layout="fill"
                    className="object-cover rounded-full"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{item.user.name}</span>
                  <span className="text-gray-500 text-sm">{item.createdAt}</span>
                </div>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
