// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

// const markdownDir = path.join(process.cwd(), "public/markdown");

// export const getMarkdownFile = async (slug: string) => {
//   const fullPath = path.join(markdownDir, `${slug}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");
//   const matterResult = matter(fileContents);
//   const matterContent = matterResult.content;
//   // get first "# " in the content as the title
//   const firstHeading = matterContent.match(/^# .*/gm);
//   let title = "";

//   if (firstHeading) {
//     title = firstHeading![0].replace("# ", "");
//   }

//   console.log(firstHeading![0]);

//   // remove # from the title

//   const parsedContent = await remark().use(html).process(matterResult.content);

//   return {
//     metadata: matterResult.data,
//     title: firstHeading ? title : "",
//     content: parsedContent.toString(),
//   };
// };
