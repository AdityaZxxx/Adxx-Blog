"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    // Handle the case where the context is not available
    return <div>Error: Theme context is not available!</div>;
  }

  const { toggle, theme } = themeContext;

  return (
    <div
      onClick={toggle}
      className={`relative flex items-center justify-between w-14 h-6 rounded-full p-1 cursor-pointer ${
        theme === "dark" ? "bg-white" : "bg-gray-900"
      }`}
    >
      {/* Moon icon */}
      <Image
        src="/moon.png"
        alt="Moon Icon"
        width={14}
        height={14}
        className={`${theme === "dark" ? "text-gray-900" : "text-white"}`}
      />

      {/* Ball switcher */}
      <div
        className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ${
          theme === "dark"
            ? "translate-x-1 bg-gray-900"
            : "translate-x-8 bg-white"
        }`}
      />

      {/* Sun icon */}
      <Image
        src="/sun.png"
        alt="Sun Icon"
        width={14}
        height={14}
        className={`${theme === "dark" ? "text-gray-900" : "text-white"}`}
      />
    </div>
  );
};

export default ThemeToggle;
