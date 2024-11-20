import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { notFound } from 'next/navigation';

const contentDirectory = path.join(process.cwd(), 'src/markdown');

export default function getPost({ slug }: { slug: string }) {

  const fullPath = path.join(contentDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const lines = content.split('\n');

  const titleLine = lines.find(line => line.trim().startsWith('#'));
  const titleLineIndex = lines.findIndex(line => line.trim().startsWith('#'));

  lines.splice(titleLineIndex, 1);

  const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : 'Untitled';

  const body = lines.filter(line => line.trim() !== titleLine).join('\n').trim();

  return {
    slug: slug, 
    metadata: {
      ...data,
      title,
    },
    content: body,
  };
}