import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'public/markdown');

export function getAllPosts() {
  const filenames = fs.readdirSync(contentDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Use gray-matter to parse metadata and content
    const { data, content } = matter(fileContent);

    // Extract the title from the first heading (`#`) and content
    const lines = content.split('\n');

    // Find the first non-empty line that starts with `#` for the title
    const titleLine = lines.find(line => line.trim().startsWith('#'));
    const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : 'Untitled';

    // Remove the title line and construct the body
    const body = lines.filter(line => line.trim() !== titleLine).join('\n').trim();

    return {
      slug: filename.replace(/\.md$/, ''), // Use filename as slug
      metadata: {
        ...data, // Frontmatter metadata (e.g., author, date)
        title,   // Extracted title
      },
      content: body, // Content without the first heading
    };
  });
}
