import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(({slug, metadata}) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              <h2>{metadata.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
