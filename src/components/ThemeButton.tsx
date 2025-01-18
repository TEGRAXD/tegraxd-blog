"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);

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

  if (!mounted) {
      return (
      <button className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg dark:text-white" type="button">
        <div className="hover:text-pink-600 dark:hover:text-pink-600">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
      </button>
      );
  };

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