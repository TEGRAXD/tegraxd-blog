import MarkdownRender from '@/components/MarkdownRender';
import getPost from '@/lib/post';
import Navbar from '@/components/Navbar';
import { metadata as defaultMetadata } from '@/app/layout';
import type { Metadata } from 'next';
import { format } from 'date-fns';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost({ slug });

  return {
    ...defaultMetadata,
    title: `${post.metadata.title} - ${process.env.NEXT_PROJECT_NAME}`,
    description: post.metadata.description
  };
}

export default async function NotePage({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = getPost({ slug });

  return (
    <main className="bg-white dark:bg-midnight">
      <Navbar />
      <section className="mx-auto min-h-screen max-w-screen-xl pt-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl text-black dark:text-white">{post.metadata.title}</h2>

            <p className="mt-4 text-black dark:text-gray-300">
              {post.metadata.description}
            </p>
          </div>
          <div className='flex items-center mt-4'>
            <img className="w-16 h-16 rounded-full" src={process.env.NEXT_PUBLIC_GITHUB_AVATAR} alt="Avatar"></img>
            <div className="ms-2">
              <p className="text-black dark:text-gray-300">{process.env.NEXT_PUBLIC_GITHUB_USERNAME}</p>
              <time dateTime={new Date(post.metadata.date).toISOString()} className="text-sm font-medium capitalize text-black dark:text-gray-300">{format(new Date(post.metadata.date), "MMM dd, yyyy")}</time>
            </div>
          </div>
          <div className="mt-4">
            <MarkdownRender content={post.content} />
          </div>
        </div>
      </section>
    </main>
  );
}