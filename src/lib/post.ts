import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { notFound } from 'next/navigation';

const contentDirectory = path.join(process.cwd(), 'public/markdown');

export default function getPost({ slug }: { slug: string }) {

  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // console.log(filename);
  console.log('x');

  // Use gray-matter to parse metadata and content
  const { data, content } = matter(fileContents);

  // Extract the title from the first heading (`#`) and content
  const lines = content.split('\n');

  // Find the first non-empty line that starts with `#` for the title
  const titleLine = lines.find(line => line.trim().startsWith('#'));
  const titleLineIndex = lines.findIndex(line => line.trim().startsWith('#'));

  lines.splice(titleLineIndex, 1);

  const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : 'Untitled';

  // Remove the title line and construct the body
  const body = lines.filter(line => line.trim() !== titleLine).join('\n').trim();

  return {
    slug: slug, // Use filename as slug
    metadata: {
      ...data, // Frontmatter metadata (e.g., author, date)
      title,   // Extracted title
    },
    content: body, // Content without the first heading
  };
}