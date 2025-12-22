"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Theme } from "@/types/themes";

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={initialTheme}
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
