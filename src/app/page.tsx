'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center bg-white dark:bg-midnight pt-24">
        <section className="max-w-lg px-8 sm:p-0">
          <h1 className="mb-4 text-2xl font-semibold">Heya!</h1>
          <p>I am a Software Engineer who lives under your bed.</p>
          <p>Loves to build open-source libraries for some community or <i>myself</i> and someone who always dedicated to continously learning best practices.</p>
          <p className="pt-6">P.S. Please be gentle to this wandering soul.</p>
          <ul className="mt-8 flex flex-col space-y-1">
            <li className="flex flex-wrap">
              <Link href={ `https://github.com/${process.env.GITHUB_USERNAME}` } target="_blank" rel="noopener noreferrer">
                <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"></path>
                  </svg>
                  <span className="font-medium ms-2">Github</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-wrap">
              <Link href={ `https://x.com/${process.env.X_USERNAME}` } target="_blank" rel="noopener noreferrer">
                <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"></path>
                  </svg>
                  <span className="font-medium ms-2">X</span>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <footer className="absolute bottom-0 w-full bg-white dark:bg-midnight">
        <div className="my-6">
          <figure className="text-center max-w-full">
            <div className="mt-0 mb-0 flex flex-wrap justify-center">
                <div className=""></div>
                <p className="text-xl font-semibold italic">&quot;{ process.env.QUOTE_TEXT}&quot;</p>
            </div>
            <figcaption className="flex items-center mt-2 space-x-3 rtl:space-x-reverse justify-center">
                <Image src={ process.env.QUOTE_AVATAR ?? '' } alt="profile picture" width={24} height={24} className="rounded-full" />
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                    <span className="pe-3 font-medium text-gray-900 dark:text-white">{ process.env.QUOTE_AUTHOR }</span>
                    <span className="ps-3 text-sm text-gray-500 dark:text-gray-400">{ process.env.QUOTE_TITLE }</span>
                </div>
            </figcaption>
          </figure>
        </div>
      </footer>
    </main>
  );
}
