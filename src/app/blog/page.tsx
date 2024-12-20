'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default  function BlogPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // const [posts, setPosts] = useState<{ slug: string; metadata: { [] } }[]>([]);
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

  // const posts = await getAllPosts();
  
  return (
        // <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
        //   <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        //     Toggle Theme Example
        //   </h1>
        //   <p className="text-gray-600 dark:text-gray-400 mb-6">
        //     Click a button below to switch themes:
        //   </p>
        //   <ThemeSwitch />
        // </main>
    <section className="bg-white dark:bg-midnight">
      <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <h1 className="text-5xl mb-4 sm:mb-8 font-bold font-mono">Blogs</h1>
        <hr className="mb-4 sm:mb-8 border-gray-300 dark:border-gray-700" />
        {/* <ul>
          {posts.map(({slug, metadata}) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <h2>{metadata.title}</h2>
              </Link>
            </li>
          ))}
        </ul> */}
        <div className="divide-y divide-gray-300 dark:divide-gray-700">
          {posts.map(({ slug, metadata }, index) => (
          // how to check if first loop then put py-8

          // console.log(),


          <div key={slug} className={ index == 0 ? "pb-8" : (index == posts.length - 1 ? "pt-8" : "pt-8 pb-8")}>
            <h2 className="text-xl font-bold sm:text-3xl text-black dark:text-white">{metadata.title}</h2>
            <div className="flex flex-wrap">
              <time dateTime={new Date(metadata.date).toISOString()} className="text-sm font-medium capitalize text-pink-500 hover:text-pink-600 dark:hover:text-pink-400">{format(new Date(metadata.date), "MMMM dd, yyyy")}</time>
            </div>
            <p className="my-2 prose text-black dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Totam corporis officia illum saepe voluptates,
              assumenda molestiae exercitationem quisquam illo omnis?
              Fuga, voluptates? Eum dolor ipsam expedita perspiciatis
              doloremque, ad illo!
            </p>

            <Link href="/blog/example">
              <h2 className="font-medium text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-500">Read more →</h2>
            </Link>
          </div>

          ))}
        </div>
        
        <hr className="mt-4 sm:mt-8 border-gray-300 dark:border-gray-700" />
      </div>
    </section>
  );
}
