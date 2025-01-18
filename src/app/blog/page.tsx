import Navbar from '@/components/Navbar';
import BlogPosts from '@/components/BlogPosts';
import { metadata as defaultMetadata } from '@/app/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `blog - ${process.env.NEXT_PROJECT_NAME}`,
};

export default function BlogPage() {  
  return (
    <main className="bg-white dark:bg-midnight">
      <Navbar />
      <BlogPosts />
    </main>
  );
}
