// import { useRouter } from 'next/router';
// import { getMarkdownFile } from '@/lib/loadMarkdown';
// import { Metadata } from 'next';

// export async function generateStaticParams() {
//   // Replace with dynamic fetching if you generate slugs from a CMS or API
//   const files = ['example']; // List your markdown filenames without extensions
//   return files.map((slug) => ({ slug }));
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params;
//   const { meta } = await getMarkdownFile(slug);
//   return { title: meta.title || 'Notes' };
// }

// export default async function NotePage({ params } : { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const { meta, content } = await getMarkdownFile(slug);

//   return (
//     <div className="prose mx-auto p-4">
//       <h1>{meta.title}</h1>
//       <p>{meta.date}</p>
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//     </div>
//   );
// }

// import { GetStaticPaths, GetStaticProps } from 'next';
// import { getMarkdownFile } from '@/lib/loadMarkdown';
// import { Metadata } from 'next';
// import Date from '@/components/date';
// import marked
// import { marked } from 'marked';
// import DOMPurify from 'dompurify';
import MarkdownRender from '@/components/MarkdownRender';
import getPost from '@/lib/post';

// export async function generateStaticParams() {
//   // Replace with dynamic fetching if you generate slugs from a CMS or API
//   const files = ['example']; // List your markdown filenames without extensions
//   return files.map((slug) => ({ slug }));
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params;
//   // const { meta } = await getMarkdownFile(slug);
//   return { title: 'Notes' };
// }

export default async function NotePage({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = getPost({ slug });

  // console.log(post);
  // const { metadata, title, content } = await getMarkdownFile(slug);

  // console.log(Object.prototype.toString.call(metadata.date));

  // return (
  //   <div className="prose dark:prose-invert mx-auto p-4">
  //     <h1>{title}</h1>
  //     <Date date={metadata.date} />
  //     <div dangerouslySetInnerHTML={{ __html: content }} />
  //   </div>
  // );

  // return (
  //   <div className="prose dark:prose-invert mx-auto p-4">
  //     <h1>Example</h1>
  //     {/* <Date date="2021-09-01" /> */}
  //     <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize('<p>Example content</p>') }} />
  //   </div>
  // );

  // <div className="mx-auto max-w-lg text-center">
  return (
    <section className="bg-white dark:bg-midnight">
      <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl text-black dark:text-white">{post.metadata.title}</h2>

          <p className="mt-4 text-black dark:text-gray-300">
            {post.metadata.description}
          </p>
        </div>

        <div className="mt-4">
          <MarkdownRender content={post.content} />
        </div>
      </div>
    </section>
  );
}