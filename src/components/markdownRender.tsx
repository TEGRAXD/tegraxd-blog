import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export default async function MarkdownRender({ content }: { content: string }) {
    const html = await marked.parse(content);

    // console.log(html);
    
    const purified = DOMPurify.sanitize(html);
    
    // const html = purify.sanitize(marked(markdown));

    return (
      <div dangerouslySetInnerHTML={{ __html: purified }} />
    );
}