'use client';

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
    // const [mounted, setMounted] = useState(false);
    
    // useEffect(() => {
    //     setMounted(true);
    // }, []);
    
    // if (!mounted) return null;
    
    return (
        <nav className="fixed flex items-center justify-between w-full h-16 p-8 bg-white dark:bg-black shadow-md dark:border-b-2 dark:border-gray-800 z-50">
        <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">TEGRA</h1>
        </Link>
        <div className="flex space-x-2">
            <Link href="/blog" className="flex items-center me-2">
                <span className="font-medium h-max text-gray-900 dark:text-white dark:hover:text-pink-600">blog</span>
            </Link>
            <ThemeButton />
            <Link href="#" as={`https://github.com/${process.env.GITHUB_USERNAME}`}>
                <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg dark:text-white" type="button">
                    <FaGithub className="w-5 h-5 hover:text-pink-600 dark:hover:text-pink-600"/>
                </button>
            </Link>
        </div>
        </nav>
    );
};

export default Navbar;