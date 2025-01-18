'use client';

import { useEffect } from 'react';
import { Marked, marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import DOMPurify from 'isomorphic-dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.css';

export default function MarkdownRender({ content }: { content: string }) {
  // useEffect is used to add event listeners to the copy buttons
  useEffect(() => {
    const copyButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.copy-btn');

    copyButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        const codeBlock = button.nextElementSibling?.textContent || '';

        try {
          const defaultMessage = button.querySelector('#default-message');
          const successMessage = button.querySelector('#success-message');

          defaultMessage?.classList.add('hidden');
          successMessage?.classList.remove('hidden');
          button.disabled = true;

          await navigator.clipboard.writeText(codeBlock);

          setTimeout(() => {
            defaultMessage?.classList.remove('hidden');
            successMessage?.classList.add('hidden');
            button.disabled = false;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text', err);
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

  renderer.paragraph = ({text}) => {
    console.log(marked.parseInline(text).toString().replaceAll('<code>', '<code class="hljs text-sm p-1 rounded-md">'));
    return `<p class="text-md text-black dark:text-gray-300">${marked.parseInline(text).toString().replaceAll('<code>', '<code class="hljs text-sm p-1 rounded-md">')}</p>`;
  }

  renderer.heading = ({text, depth}) => {
    const escapedText = DOMPurify.sanitize(text);
    const id = escapedText.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');

    return `
      <h${depth} id="${id}" class="group/head relative border-b border-gray-400 dark:border-gray-600 text-2xl font-semibold mt-4 mb-4 text-black dark:text-gray-100 flex items-center">
        ${marked.parseInline(escapedText).toString().replaceAll('<code>', '<code class="hljs text-sm p-1 rounded-md">')}
        <a href="#${id}" class="group/pilcrow inline-block no-underline ms-2 invisible group-hover/head:visible group-hover/head:text-gray-500 dark:group-hover/head:text-gray-400">
          <div class="group-hover/pilcrow:text-black dark:group-hover/pilcrow:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15">
              <path fill="currentColor" fill-rule="evenodd" d="M3 5.5C3 7.983 4.992 9 7 9v3.5a.5.5 0 0 0 1 0V3.1h1v9.4a.5.5 0 0 0 1 0V3.1h1.5a.55.55 0 1 0 0-1.1H7C4.992 2 3 3.017 3 5.5" clip-rule="evenodd" />
            </svg>
          </div>
        </a>
      </h${depth}>
    `;
  };

  renderer.codespan = ({text}) => {
    const escapedCode = DOMPurify.sanitize(text);

    return `<code class="hljs text-sm p-1 rounded-md">${escapedCode}</code>`;
  }

  renderer.code = ({text, lang}) => {
    const escapedCode = DOMPurify.sanitize(text);
    const language = lang ? `language-${lang}` : '';

    return `
      <div class="code-block relative">
        <button class="copy-btn absolute top-2 right-1.5 text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
          <span id="default-message" class="inline-flex items-center">
              <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
              </svg>
              <span class="text-xs font-semibold">Copy</span>
          </span>
          <span id="success-message" class="hidden inline-flex items-center">
              <svg class="w-3 h-3 text-blue-500 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
              <span class="text-xs font-semibold text-blue-500 dark:text-blue-500">Copied</span>   
          </span>
        </button>
        <pre class="text-sm overflow-hidden mb-6"><span class="hljs mb-0 p-4 block min-h-full overflow-auto"><code class="${language}">${escapedCode}</code></span></pre>
      </div>
    `;
  };

  const mrkd = new Marked(
    {
      gfm: true,
      breaks: true,
      async: false,
    },
    markedHighlight({
      langPrefix: 'language-',
      highlight: (code, lang) => {
        return hljs.highlight(code, { language: lang}).value;
      }
    }),
  );

  const html = mrkd.parse(content, {renderer: renderer, async: false});

  const purified = DOMPurify.sanitize(html);

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: purified }}
    />
  );
}
