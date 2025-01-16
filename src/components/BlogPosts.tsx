'use client';

import Link from "next/link";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default function BlogPosts() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [posts, setPosts] = useState<{ slug: string; metadata: { [key: string]: string } }[]>([]);

  // Ensure proper rendering after client-side hydration
  useEffect(() => {
    setMounted(true);

    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  if (!mounted) return null; // Prevent UI hydration issues in SSR

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
                <span className="font-medium text-sm text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-500">Read more →</span>
              </Link>
            </div>
          ))}
        </div>
        <hr className="mt-4 sm:mt-8 border-gray-300 dark:border-gray-700" />
      </div>
    </section>
  );
}