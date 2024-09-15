"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import { FaPlus } from "react-icons/fa";

// Lazy load ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Tipe data untuk state
interface WritePageProps {}

// Tipe data untuk file
interface File extends Blob {
  name: string;
  type: string;
  size: number;
}

// Komponen utama
const WritePage: FC<WritePageProps> = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [media, setMedia] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file as Blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    }
  }, [file]);

  if (status === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Title"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
        <option value="coding">Coding</option>
      </select>
      <div className="relative">
        <button
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
          onClick={() => setOpen(!open)}
        >
          <FaPlus size={16} />
        </button>
        {open && (
          <div className="absolute top-10 right-2 bg-white border border-gray-300 shadow-lg rounded-lg p-2 flex gap-2">
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label htmlFor="image" className="p-2 bg-gray-200 rounded-full cursor-pointer">
              <Image src="/image.png" alt="Image" width={16} height={16} />
            </label>
            <button className="p-2 bg-gray-200 rounded-full">
              <Image src="/external.png" alt="External" width={16} height={16} />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <Image src="/video.png" alt="Video" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className="h-80 mt-4"
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default WritePage;
