import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
// import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-7 container mx-auto px-4">
      {/* Judul */}
      <h1 className="text-6xl font-bold leading-tight   max-w-3xl sm:text-3xl md:text-5xl">
        Hey, Aditya here! Discover my stories and creative ideas.
      </h1>

      {/* Section Konten Utama */}
      <div className="mt-14 flex flex-col lg:flex-row items-start gap-12">
        {/* Gambar */}
        <div className="relative w-full lg:w-1/2 h-[500px]">
          <Image src="/p1.jpg" alt="Feature Image" fill className="object-cover rounded-lg" />
        </div>

        {/* Teks Deskripsi */}
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <h1 className="text-3xl font-semibold leading-snug">
            Explore the world of creativity and discover new ideas for design, tech, and innovation.
          </h1>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate, quam nisi magni ea laborum inventore voluptatum laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium quisquam! Harum unde sit culpa debitis.
          </p>

          {/* Tombol */}
          <Button className="font-bold">
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
