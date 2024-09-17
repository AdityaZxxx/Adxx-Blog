"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Error: Theme context is not available!</div>;
  }

  const { toggle, theme } = themeContext;

  return (
    <div
      onClick={toggle}
      className={`relative flex items-center justify-between w-14 h-6 rounded-xl p-1 cursor-pointer transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-600" : "bg-gray-400"
      }`}
    >
      {/* Moon icon */}
      <Image
        src="/moon.png"
        alt="Moon Icon"
        width={14}
        height={14}
        className="text-white"
      />

      {/* Ball switcher */}
      <div
        className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ${
          theme === "dark" ? "translate-x-0 bg-white" : "translate-x-full bg-gray-800"
        }`}
      />

      {/* Sun icon */}
      <Image
        src="/sun.png"
        alt="Sun Icon"
        width={14}
        height={14}
        className="text-gray-900"
      />
    </div>
  );
};

export default ThemeToggle;
