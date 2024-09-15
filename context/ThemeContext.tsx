"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

// Definisikan tipe untuk konteks tema
interface ThemeContextType {
  theme: string;
  toggle: () => void;
}

// Tentukan tipe untuk ThemeContext
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fungsi untuk mengambil tema dari localStorage
const getFromLocalStorage = (): string => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
  return "light"; // Default jika tidak ada localStorage
};

// Definisikan tipe untuk props di ThemeContextProvider
interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>(() => getFromLocalStorage());

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
