import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MenuPostsProps {
  withImage: boolean;
}

const MenuPosts: React.FC<MenuPostsProps> = ({ withImage }) => {
  return (
    <div className="mt-9 mb-14 flex flex-col gap-8">
      <Link href="/" className="flex items-center gap-5">
        {withImage && (
          <div className="aspect-square relative">
            <Image
              src="/p1.jpg"
              alt="Post Image"
              fill
              className="border object-cover rounded-sm"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm rounded-full text-white bg-red-500 font-medium max-w-max border py-0 px-2">
            Travel
          </span>
          <h3 className="text-lg font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className="text-sm">
            <span className="text-sm">John Doe</span>
            <span className="text-sm"> - 10.03.2023</span>
          </div>
        </div>
      </Link>

      <Link href="/" className="flex items-center gap-5">
        {withImage && (
          <div className="flex aspect-square relative">
            <Image
              src="/p1.jpg"
              alt="Post Image"
              fill
              className="border object-cover rounded-sm"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm rounded-full text-white bg-blue-500 font-medium max-w-max border py-0 px-2">
            Culture
          </span>
          <h3 className="text-lg font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className="text-sm">
            <span className="text-sm">John Doe</span>
            <span className="text-sm"> - 10.03.2023</span>
          </div>
        </div>
      </Link>

      <Link href="/" className="flex items-center gap-5">
        {withImage && (
          <div className="flex aspect-square relative">
            <Image
              src="/p1.jpg"
              alt="Post Image"
              fill
              className="border object-cover rounded-sm"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm rounded-full text-white bg-green-500 font-medium max-w-max border py-0 px-2">
            Food
          </span>
          <h3 className="text-lg font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className="text-sm">
            <span className="text-sm">John Doe</span>
            <span className="text-sm"> - 10.03.2023</span>
          </div>
        </div>
      </Link>

      <Link href="/" className="flex items-center gap-5">
        {withImage && (
          <div className="flex aspect-square relative">
            <Image
              src="/p1.jpg"
              alt="Post Image"
              fill
              className="border object-cover rounded-sm"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-sm rounded-full text-white bg-purple-500 font-medium max-w-max border py-0 px-2">
            Fashion
          </span>
          <h3 className="text-lg font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className="text-sm">
            <span className="text-sm">John Doe</span>
            <span className="text-sm"> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPosts;
