"use client";

import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import Loading from "@/components/Loading";
import { FaExternalLinkAlt, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";

interface FileType extends File {
  name: string;
}

const WritePage: React.FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileType | null>(null);
  const [media, setMedia] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");

  // Upload file hanya dijalankan di client-side
  useEffect(() => {
    const uploadToCloudinary = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "adxxblog");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Error during file upload");
        }

        const data = await res.json();
        setMedia(data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    if (file) {
      uploadToCloudinary();
    }
  }, [file]);

  // Redirect jika status session sedang loading atau tidak terautentikasi
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  // Fungsi untuk slugify
  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Handle submit post
  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Enter Title"
        className="w-full p-4 text-xl border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
        <option value="coding">Coding</option>
      </select>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <FaPlus size={24} className="text-gray-700 dark:text-white" />
        </button>

        {open && (
          <div className="flex space-x-4">
            <label
              htmlFor="image"
              className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <FaImage size={16} className="text-gray-700 dark:text-white" />
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
              />
            </label>

            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
              <FaExternalLinkAlt size={16} className="text-gray-700 dark:text-white" />
            </button>

            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
              <FaVideo size={16} className="text-gray-700 dark:text-white" />
            </button>
          </div>
        )}
      </div>

      <ReactQuill
        className="w-full h-64 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        theme="bubble"
        value={value}
        onChange={setValue}
        placeholder="Tell your story..."
      />

      <Button
        variant="default"
        className="w-full p-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Publish
      </Button>

      {media && <CldImage alt="Uploaded image" src={media} width="500" height="500" />}
    </div>
  );
};

export default WritePage;
