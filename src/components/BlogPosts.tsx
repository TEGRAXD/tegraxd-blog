'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default function BlogPosts() {
  const [mounted, setMounted] = useState(false);

  const [posts, setPosts] = useState<{ slug: string; metadata: { [key: string]: string } }[]>([]);

  // Ensure proper rendering after client-side hydration
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);

    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
      localStorage.setItem('posts', JSON.stringify(posts));
    };

    fetchPosts();
  }, []);

  if (!mounted) {
    return (
      <section className="mx-auto min-h-screen max-w-screen-xl pt-24 flex flex-col">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
          <h4 className="text-4xl mb-4 sm:mb-8 font-bold font-mono">blog</h4>
          <hr className="mb-4 sm:mb-8 border-gray-300 dark:border-gray-700" />
          <div className="flex flex-1 justify-center">
            <div className="my-auto pb-[15%] hover:text-pink-600 dark:hover:text-pink-600">
              <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="mx-auto min-h-screen max-w-screen-xl pt-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <h4 className="text-4xl mb-4 sm:mb-8 font-bold font-mono">blog</h4>
        <hr className="mb-4 sm:mb-8 border-gray-300 dark:border-gray-700" />
        <div className="divide-y divide-gray-300 dark:divide-gray-700">
          {posts.map(({ slug, metadata }, index) => (
            <div key={slug} className={ posts.length > 1 ? (index == 0 ? "pb-8" : (index == posts.length - 1 ? "pt-8" : "pt-8 pb-8")) : ""}>
              <h5 className="text-xl font-bold sm:text-xl text-black dark:text-white">{metadata.title}</h5>
              <div className="flex flex-wrap">
                <time dateTime={new Date(metadata.date).toISOString()} className="text-sm font-medium capitalize text-pink-500 hover:text-pink-600 dark:hover:text-pink-400">{format(new Date(metadata.date), "MMMM dd, yyyy")}</time>
              </div>
              <p className="my-2 text-md prose text-black dark:text-gray-300">
                {metadata.description}
              </p>

              <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                <span className="font-medium text-sm text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white">Read more →</span>
              </Link>
            </div>
          ))}
        </div>
        <hr className="mt-4 sm:mt-8 border-gray-300 dark:border-gray-700" />
      </div>
    </section>
  );
}