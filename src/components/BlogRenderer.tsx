'use client';

import { BlogContent, ContentBlock } from '@/types/blog';
import { CodeMorph } from './CodeMorph';
import { InteractiveCode } from './InteractiveCode';
import { AnimatedDiagram } from './AnimatedDiagram';
import { VirtualWhiteboard } from './VirtualWhiteboard';
import { CodeSteps } from './CodeSteps';

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
  switch (block.type) {
    case 'text':
      return (
        <p className="text-lg text-[#153230]/80 leading-relaxed whitespace-pre-wrap">
          {block.content}
        </p>
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
      return (
        <div className="my-12">
          <CodeSteps 
            steps={block.steps || []}
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
              — {block.author}
            </footer>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}