"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatches by only mounting after the client renders
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent mismatched UI

  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 rounded-lg font-semibold ${
          resolvedTheme === "light"
            ? "bg-cyan-700 text-white"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Light
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 rounded-lg font-semibold ${
          resolvedTheme === "dark"
            ? "bg-cyan-700 text-white"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Dark
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`px-4 py-2 rounded-lg font-semibold ${
          resolvedTheme === "system"
            ? "bg-cyan-700 text-white"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        System
      </button>
    </div>
  );
}
