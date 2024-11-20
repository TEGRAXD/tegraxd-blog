import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/markdown');

export function getAllPosts() {
  const filenames = fs.readdirSync(contentDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data, content } = matter(fileContent);

    const lines = content.split('\n');

    const titleLine = lines.find(line => line.trim().startsWith('#'));
    const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : 'Untitled';

    const body = lines.filter(line => line.trim() !== titleLine).join('\n').trim();

    return {
      slug: filename.replace(/\.md$/, ''),
      metadata: {
        ...data,
        title,
      },
      content: body,
    };
  });
}
