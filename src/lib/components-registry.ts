import { ContentBlock } from '@/types/blog';

export interface ComponentConfig {
  name: string;
  description: string;
  icon: string;
  defaultData: Partial<ContentBlock>;
}

export const AVAILABLE_COMPONENTS: Record<string, ComponentConfig> = {
  'text': {
    name: 'Text',
    description: 'Paragraph text content',
    icon: '📝',
    defaultData: {
      type: 'text',
      content: '',
    },
  },
  'heading': {
    name: 'Heading',
    description: 'Section heading',
    icon: '📌',
    defaultData: {
      type: 'heading',
      level: 2,
      content: '',
    },
  },
  'code-morph': {
    name: 'Code Morph',
    description: 'Smooth code transitions with word-sliding animations',
    icon: '🔄',
    defaultData: {
      type: 'code-morph',
      title: '',
      steps: [
        {
          title: 'Step 1',
          description: '',
          code: '',
        },
      ],
    },
  },
  'interactive-code': {
    name: 'Interactive Code',
    description: 'Tabbed code examples with explanations',
    icon: '💻',
    defaultData: {
      type: 'interactive-code',
      title: '',
      examples: [
        {
          title: 'Example 1',
          code: '',
          explanation: '',
          color: 'blue',
        },
      ],
    },
  },
  'animated-diagram': {
    name: 'Animated Diagram',
    description: 'Step-by-step visual diagrams',
    icon: '📊',
    defaultData: {
      type: 'animated-diagram',
      title: '',
      steps: [
        {
          title: 'Step 1',
          description: '',
          color: 'blue',
        },
      ],
    },
  },
  'code-steps': {
    name: 'Code Steps',
    description: 'Step-by-step code walkthrough',
    icon: '📋',
    defaultData: {
      type: 'code-steps',
      steps: [
        {
          title: 'Step 1',
          description: '',
          code: '',
        },
      ],
    },
  },
  'image': {
    name: 'Image',
    description: 'Add an image with caption',
    icon: '🖼️',
    defaultData: {
      type: 'image',
      url: '',
      alt: '',
      caption: '',
    },
  },
  'quote': {
    name: 'Quote',
    description: 'Blockquote or callout',
    icon: '💬',
    defaultData: {
      type: 'quote',
      content: '',
      author: '',
    },
  },
  'callout': {
    name: 'Callout Box',
    description: 'Highlighted information box with icon',
    icon: '💡',
    defaultData: {
      type: 'callout',
      variant: 'info',
      title: 'Key Insight',
      content: '',
      icon: '💡',
    },
  },
  'code-block': {
    name: 'Code Block',
    description: 'Syntax-highlighted code snippet',
    icon: '🔤',
    defaultData: {
      type: 'code-block',
      title: '',
      code: '',
      language: 'javascript',
      showLineNumbers: true,
    },
  },
  'button': {
    name: 'Interactive Button',
    description: 'Clickable button element',
    icon: '🔘',
    defaultData: {
      type: 'button',
      text: 'Click me',
      action: 'counter',
      variant: 'primary',
    },
  },
  'list': {
    name: 'Styled List',
    description: 'Bullet or numbered list with custom styling',
    icon: '📋',
    defaultData: {
      type: 'list',
      items: ['Item 1', 'Item 2', 'Item 3'],
      variant: 'bullet',
      colored: false,
    },
  },
  'code-playground': {
    name: 'Code Playground',
    description: 'Interactive code editor with live execution',
    icon: '🎮',
    defaultData: {
      type: 'code-playground',
      title: 'Try It Yourself!',
    },
  },
};