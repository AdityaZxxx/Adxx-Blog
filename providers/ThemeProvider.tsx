"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const themeContext = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pastikan ThemeContext ada dan mounted bernilai true
  if (!mounted || !themeContext) {
    return null; // Bisa juga return loading spinner jika diperlukan
  }

  const { theme } = themeContext;

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
