"use server";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/markdown');

export async function getAllPosts() {
  const filenames = fs.readdirSync(contentDirectory);

  return new Promise<{ slug: string, metadata: { [key: string]: string }, content: string }[]>((resolve, reject) => {
    try {
      const posts = filenames.map((filename) => {
        const filePath = path.join(contentDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const { data, content } = matter(fileContent);

        const lines = content.split('\n');

        const body = lines.join('\n').trim();

        return {
          slug: filename.replace(/\.md$/, ''),
          metadata: {
            ...data,
          },
          content: body,
        };
      }).sort((a, b) => { 
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
      });

      resolve(posts);
    } catch (err) {
      reject(err);
    }
  });
}
