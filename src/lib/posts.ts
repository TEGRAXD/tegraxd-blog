"use server";

import fs from 'fs';
import path, { resolve } from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/markdown');

export async function getAllPosts() {
  const filenames = fs.readdirSync(contentDirectory);

  // return new Promise<{ slug: string, metadata: , content: string }[]>((resolve, reject) => {
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
            // title: data.title || 'Untitled',
            // description: data.description,
            // date: data.date
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


  

  // return new Promise<{ slug: string, metadata: { title: string }, content: string }[]>((filenames.map((filename) => {
  //   const filePath = path.join(contentDirectory, filename);
  //   const fileContent = fs.readFileSync(filePath, 'utf8');

  //   const { data, content } = matter(fileContent);

  //   const lines = content.split('\n');

  //   // const titleLine = lines.find(line => line.trim().startsWith('#'));
  //   // const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : 'Untitled';

  //   // const body = lines.filter(line => line.trim() !== titleLine).join('\n').trim();

  //   const title = data.title || 'Untitled';
  //   const body = lines.join('\n').trim();

  //   return {
  //     slug: filename.replace(/\.md$/, ''),
  //     metadata: {
  //       ...data,
  //       title,
  //     },
  //     content: body,
  //   };

  //   // return new Promise<{ slug: string, metadata: { title: string }, content: string }>((resolve) => {
  //   //   setTimeout(() => {
  //   //     resolve({
  //   //       slug: filename.replace(/\.md$/, ''),
  //   //       metadata: {
  //   //         ...data,
  //   //         title,
  //   //       },
  //   //       content: body,
  //   //     });
  //   //   }, 0);
  //   // });
  // });
}
