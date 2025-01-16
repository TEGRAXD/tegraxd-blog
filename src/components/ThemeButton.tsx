"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
        <div className="inline-block text-left" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} id="menu-button" aria-expanded={isOpen} aria-haspopup="true" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg dark:text-white" type="button">
                <div className="hover:text-pink-600 dark:hover:text-pink-600">
                    {theme === "dark" ? <FaMoon className="w-5 h-5" /> : (theme === "light" ? <FaSun className="w-5 h-5" /> : <FaDesktop className="w-5 h-5"/> )}
                </div>
            </button>

            {isOpen && (
            <div className="absolute right-8 z-10 mt-2 sm:mt-6 w-32 top-full rounded-md bg-white shadow-lg" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                <button onClick={() => setTheme('light')} className="block flex w-full px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">
                    <FaSun className={`w-5 h-5 me-2 ${theme === "light" ? "text-pink-600 dark:text-pink-600" : "text-gray-600"}`} />
                    <span>Light</span>
                </button>
                <button onClick={() => setTheme('dark')} className="block flex w-full px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">
                    <FaMoon className={`w-5 h-5 me-2 ${theme === "dark" ? "text-pink-600 dark:text-pink-600" : "text-gray-600"}`} />
                    <span>Dark</span>
                </button>
                <button onClick={() => setTheme('system')} className={`block flex w-full px-4 py-2 text-sm ${theme === "system" ? "text-pink-600 dark:text-pink-600" : "text-gray-700"}`} role="menuitem" tabIndex={-1} id="menu-item-2">
                    <FaDesktop className={`w-5 h-5 me-2 ${theme === "system" ? "text-pink-600 dark:text-pink-600" : "text-gray-600"}`} />
                    <span>System</span>
                </button>
                </div>
            </div>
            )}
        </div>
    </div>
  );
};