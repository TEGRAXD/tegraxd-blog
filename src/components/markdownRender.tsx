'use client';

import { useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export default function MarkdownRender({ content }: { content: string }) {
  // useEffect is used to add event listeners to the copy buttons
  useEffect(() => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const codeBlock = button.nextElementSibling?.textContent || '';
        try {
          await navigator.clipboard.writeText(codeBlock);
          button.textContent = 'OK';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      });
    });

    // Clean up some event listeners
    return () => {
      copyButtons.forEach((button) => {
        button.removeEventListener('click', () => {});
      });
    };
  }, [content]);

  const renderer = new marked.Renderer();

  renderer.code = ({text, lang}) => {
    const escapedCode = DOMPurify.sanitize(text);
    const language = lang ? `language-${lang}` : '';

    return `
      <div class="code-block">
        <button class="copy-btn">Copy</button>
        <pre><code class="language-${language}">${escapedCode}</code></pre>
      </div>
    `;
  };

  const html = marked(content, {renderer: renderer, async: false});
  
  const purified = DOMPurify.sanitize(html);

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: purified }}
    />
  );
}