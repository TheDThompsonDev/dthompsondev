'use client';

import { BlogContent, ContentBlock } from '@/types/blog';
import { CodeMorph } from '@/components/interactive/CodeMorph';
import { InteractiveCode } from '@/components/interactive/InteractiveCode';
import { AnimatedDiagram } from '@/components/interactive/AnimatedDiagram';
import { VirtualWhiteboard } from '@/components/interactive/VirtualWhiteboard';
import { CodePlayground } from '@/components/interactive/CodePlayground';

interface BlogRendererProps {
  content: BlogContent;
}

export function BlogRenderer({ content }: BlogRendererProps) {
  return (
    <div className="space-y-8">
      {content.blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  const renderFormattedText = (text: string) => {
    let formatted = text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/__(.+?)__/g, '<u>$1</u>');

    return formatted;
  };

  switch (block.type) {
    case 'text':
      return (
        <p
          className="text-lg leading-relaxed whitespace-pre-wrap text-[#153230]/80"
          dangerouslySetInnerHTML={{ __html: renderFormattedText(block.content) }}
        />
      );

    case 'heading':
      const HeadingTag = `h${block.level}` as 'h1' | 'h2' | 'h3';
      const headingStyles = {
        1: 'text-4xl md:text-5xl font-black text-[#153230] mb-6',
        2: 'text-3xl md:text-4xl font-black text-[#153230] mb-4',
        3: 'text-2xl md:text-3xl font-bold text-[#153230] mb-3',
      };

      return (
        <HeadingTag
          id={block.id || block.content?.toLowerCase().replace(/\s+/g, '-')}
          className={headingStyles[block.level || 2]}
        >
          {block.content}
        </HeadingTag>
      );

    case 'code-morph':
      return (
        <div className="my-12">
          <CodeMorph
            title={block.title || ''}
            steps={block.steps || []}
          />
        </div>
      );

    case 'interactive-code':
      return (
        <div className="my-12">
          <InteractiveCode
            title={block.title}
            examples={block.examples || []}
          />
        </div>
      );

    case 'animated-diagram':
      return (
        <div className="my-12">
          <AnimatedDiagram
            title={block.title || ''}
            steps={block.steps || []}
          />
        </div>
      );

    case 'whiteboard':
      return (
        <div className="my-12">
          <VirtualWhiteboard
            title={block.title}
            height={block.height}
          />
        </div>
      );

    case 'code-steps':
      // Legacy support: Map code-steps to CodeMorph
      return (
        <div className="my-12">
          <CodeMorph
            title={(block as any).title || ((block as any).steps?.[0]?.title) || ''}
            steps={(block as any).steps || []}
          />
        </div>
      );

    case 'image':
      return (
        <figure className="my-8">
          <img
            src={block.url}
            alt={block.alt || ''}
            className="w-full rounded-2xl shadow-lg"
          />
          {block.caption && (
            <figcaption className="text-center text-sm text-[#153230]/60 mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'quote':
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-[#4D7DA3] bg-[#4D7DA3]/5 py-4 pr-6 rounded-r-lg">
          <p className="text-lg text-[#153230]/90 italic leading-relaxed">
            {block.content}
          </p>
          {block.author && (
            <footer className="text-sm text-[#153230]/60 mt-2">
              , {block.author}
            </footer>
          )}
        </blockquote>
      );

    case 'callout':
      const variantStyles = {
        info: 'bg-blue-50 border-blue-500 text-blue-900',
        warning: 'bg-amber-50 border-amber-500 text-amber-900',
        success: 'bg-emerald-50 border-emerald-500 text-emerald-900',
        error: 'bg-red-50 border-red-500 text-red-900',
      };
      return (
        <div className={`my-8 rounded-2xl p-6 border-l-4 ${variantStyles[block.variant || 'info']}`}>
          <p className="font-semibold mb-2 flex items-center gap-2">
            {block.icon && <span className="text-2xl">{block.icon}</span>}
            <span>{block.title}</span>
          </p>
          <p className="leading-relaxed opacity-90">
            {block.content}
          </p>
        </div>
      );

    case 'code-block':
      return (
        <div className="my-8 border border-gray-200 rounded-lg overflow-hidden">
          {block.title && (
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-3">
              <div className="w-2 h-2 rounded-lg bg-blue-500"></div>
              <h4 className="text-sm font-semibold text-gray-700">{block.title}</h4>
            </div>
          )}
          <div className="p-6">
            <pre className="bg-[#0d1117] text-gray-100 p-6 rounded-lg overflow-x-auto text-sm border border-gray-800">
              <code>{block.code}</code>
            </pre>
          </div>
        </div>
      );

    case 'button':
      const buttonStyles = {
        primary: 'bg-gray-900 text-white hover:bg-gray-800',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
      };
      return (
        <div className="my-8 flex justify-center">
          <button
            className={`px-8 py-4 rounded-lg font-semibold text-base transition-all ${buttonStyles[block.variant || 'primary']}`}
          >
            {block.text}
          </button>
        </div>
      );

    case 'list':
      const colors = ['blue', 'purple', 'emerald', 'amber', 'pink'];
      return (
        <ul className="my-8 space-y-4">
          {block.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-gray-700 leading-relaxed">
              {block.variant === 'numbered' ? (
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${block.colored ? `bg-${colors[idx % colors.length]}-100 text-${colors[idx % colors.length]}-600` : 'bg-gray-100 text-gray-600'
                  }`}>
                  {idx + 1}
                </span>
              ) : block.variant === 'checkmark' ? (
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${block.colored ? `bg-${colors[idx % colors.length]}-100` : 'bg-gray-100'
                  }`}>
                  <div className={`w-2 h-2 rounded-lg ${block.colored ? `bg-${colors[idx % colors.length]}-600` : 'bg-gray-600'
                    }`}></div>
                </div>
              ) : (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${block.colored ? `bg-${colors[idx % colors.length]}-100` : 'bg-gray-100'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${block.colored ? `bg-${colors[idx % colors.length]}-600` : 'bg-gray-600'
                    }`}></div>
                </div>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'code-playground':
      return (
        <div className="my-12">
          <CodePlayground />
        </div>
      );

    default:
      return null;
  }
}