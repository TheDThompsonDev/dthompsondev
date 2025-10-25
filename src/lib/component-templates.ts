import { ContentBlock } from '@/types/blog';

export interface ComponentTemplate {
  name: string;
  description: string;
  icon: string;
  blocks: ContentBlock[];
}

export const COMPONENT_TEMPLATES: Record<string, ComponentTemplate> = {
  'tutorial-3-step': {
    name: '3-Step Tutorial',
    description: 'Perfect for step-by-step guides',
    icon: '📚',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'How to [Your Topic]',
      } as ContentBlock,
      {
        type: 'code-steps',
        steps: [
          {
            title: 'Step 1: Setup',
            description: 'First, we need to set up our environment',
            code: '// Your setup code here',
          },
          {
            title: 'Step 2: Implementation',
            description: 'Now let\'s implement the core logic',
            code: '// Your implementation code here',
          },
          {
            title: 'Step 3: Testing',
            description: 'Finally, let\'s test our implementation',
            code: '// Your test code here',
          },
        ],
      } as ContentBlock,
    ],
  },

  'key-takeaways': {
    name: 'Key Takeaways',
    description: 'Summarize main points beautifully',
    icon: '✨',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Key Takeaways',
      } as ContentBlock,
      {
        type: 'list',
        variant: 'checkmark',
        colored: true,
        items: [
          'First key insight or learning point',
          'Second important takeaway',
          'Third critical concept',
          'Fourth essential understanding',
        ],
      } as ContentBlock,
    ],
  },

  'before-after': {
    name: 'Before/After Code',
    description: 'Show transformation or comparison',
    icon: '🔄',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Refactoring Example',
      } as ContentBlock,
      {
        type: 'code-morph',
        title: 'From Good to Better',
        steps: [
          {
            title: 'Before: Basic Approach',
            description: 'This works, but we can improve it',
            code: '// Your before code\nfunction example() {\n  // Implementation\n}',
          },
          {
            title: 'After: Optimized Solution',
            description: 'Much better! Here\'s why...',
            code: '// Your after code\nfunction betterExample() {\n  // Improved implementation\n}',
          },
        ],
      } as ContentBlock,
    ],
  },

  'interactive-demo': {
    name: 'Interactive Demo',
    description: 'Hands-on code examples',
    icon: '🎮',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Try It Yourself',
      } as ContentBlock,
      {
        type: 'text',
        content: 'The best way to learn is by doing. Here are some interactive examples:',
      } as ContentBlock,
      {
        type: 'interactive-code',
        title: 'Interactive Examples',
        examples: [
          {
            title: 'Example 1',
            code: '// Your code here',
            explanation: 'Explanation of what this code does',
            color: '#4D7DA3',
          },
          {
            title: 'Example 2',
            code: '// Alternative approach',
            explanation: 'Why this approach might be better',
            color: '#10B981',
          },
        ],
      } as ContentBlock,
    ],
  },

  'visual-concept': {
    name: 'Visual Concept',
    description: 'Explain with diagrams',
    icon: '📊',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'How It Works',
      } as ContentBlock,
      {
        type: 'text',
        content: 'Let\'s break down this concept visually:',
      } as ContentBlock,
      {
        type: 'animated-diagram',
        title: 'The Process',
        steps: [
          {
            title: 'Step 1',
            description: 'First thing that happens',
            color: '#4D7DA3',
            icon: '🚀',
          },
          {
            title: 'Step 2',
            description: 'Next in the sequence',
            color: '#10B981',
            icon: '⚙️',
          },
          {
            title: 'Step 3',
            description: 'Final result',
            color: '#8B5CF6',
            icon: '✅',
          },
        ],
      } as ContentBlock,
    ],
  },

  'feature-highlight': {
    name: 'Feature Highlight',
    description: 'Showcase a key feature',
    icon: '⭐',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Feature Name',
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'info',
        title: 'What makes this special',
        content: 'Explain why this feature is important and how it helps users',
        icon: '💡',
      } as ContentBlock,
      {
        type: 'text',
        content: 'Detailed explanation of the feature, how it works, and when to use it.',
      } as ContentBlock,
      {
        type: 'code-block',
        title: 'Usage Example',
        code: '// Show how to use this feature\nconst example = "code here";',
        language: 'javascript',
      } as ContentBlock,
    ],
  },

  'problem-solution': {
    name: 'Problem → Solution',
    description: 'Address common issues',
    icon: '💡',
    blocks: [
      {
        type: 'heading',
        level: 2,
        content: 'Common Challenge',
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'warning',
        title: 'The Problem',
        content: 'Describe the problem or pain point users face',
        icon: '⚠️',
      } as ContentBlock,
      {
        type: 'text',
        content: 'More context about why this is challenging...',
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'success',
        title: 'The Solution',
        content: 'Here\'s how to solve it effectively',
        icon: '✅',
      } as ContentBlock,
      {
        type: 'code-block',
        title: 'Implementation',
        code: '// Solution code',
        language: 'javascript',
      } as ContentBlock,
    ],
  },

  'full-tutorial-article': {
    name: '📚 Complete Tutorial Article',
    description: 'Full tutorial with intro, examples, playground, and takeaways',
    icon: '📚',
    blocks: [
      {
        type: 'heading',
        level: 1,
        content: 'Your Tutorial Title',
      } as ContentBlock,
      {
        type: 'text',
        content: 'A comprehensive guide to understanding [topic]. This tutorial will walk you through everything you need to know with interactive examples and hands-on practice.',
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'info',
        title: 'What You\'ll Learn',
        content: 'By the end of this tutorial, you\'ll understand the core concepts and be able to apply them in real projects.',
        icon: '🎯',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Introduction',
      } as ContentBlock,
      {
        type: 'text',
        content: 'Start with context - why is this topic important? What problems does it solve?',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Core Concepts',
      } as ContentBlock,
      {
        type: 'code-morph',
        title: 'Evolution from Basic to Advanced',
        steps: [
          {
            title: 'Step 1: Basic Concept',
            description: 'We start with the simplest form',
            code: '// Basic example\nconst basic = "simple";',
          },
          {
            title: 'Step 2: Adding Features',
            description: 'Now let\'s add more functionality',
            code: '// Enhanced version\nconst enhanced = {\n  value: "advanced",\n  features: true\n};',
          },
          {
            title: 'Step 3: Best Practice',
            description: 'The optimal way to implement this',
            code: '// Production-ready\nconst optimal = {\n  value: "best practice",\n  features: true,\n  performance: "optimized"\n};',
          },
        ],
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Try It Yourself',
      } as ContentBlock,
      {
        type: 'text',
        content: 'The best way to learn is by doing. Use the playground below to experiment:',
      } as ContentBlock,
      {
        type: 'code-playground',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Common Patterns',
      } as ContentBlock,
      {
        type: 'interactive-code',
        title: 'Real-World Examples',
        examples: [
          {
            title: 'Pattern 1',
            code: '// First common pattern\nconst pattern1 = "example";',
            explanation: 'This pattern is useful when...',
            color: '#4D7DA3',
          },
          {
            title: 'Pattern 2',
            code: '// Alternative approach\nconst pattern2 = "different";',
            explanation: 'Use this when you need...',
            color: '#10B981',
          },
        ],
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Key Takeaways',
      } as ContentBlock,
      {
        type: 'list',
        variant: 'checkmark',
        colored: true,
        items: [
          'First major concept you learned',
          'Second important principle',
          'Third critical understanding',
          'Best practice to remember',
          'Common pitfall to avoid',
        ],
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'success',
        title: 'Next Steps',
        content: 'Now that you understand the basics, try building a small project using these concepts!',
        icon: '🚀',
      } as ContentBlock,
    ],
  },

  'full-concept-explained': {
    name: '💡 Concept Deep Dive',
    description: 'In-depth explanation with visuals and playground',
    icon: '💡',
    blocks: [
      {
        type: 'heading',
        level: 1,
        content: 'Understanding [Concept Name]',
      } as ContentBlock,
      {
        type: 'text',
        content: 'A deep dive into one of the most important concepts in modern development.',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'What Is It?',
      } as ContentBlock,
      {
        type: 'text',
        content: 'Clear, simple definition of the concept and why it matters.',
      } as ContentBlock,
      {
        type: 'callout',
        variant: 'info',
        title: 'Simple Analogy',
        content: 'Think of it like [real-world analogy] - this helps you understand intuitively.',
        icon: '💡',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'How It Works',
      } as ContentBlock,
      {
        type: 'animated-diagram',
        title: 'Visual Breakdown',
        steps: [
          {
            title: 'Phase 1',
            description: 'First thing that happens',
            color: '#4D7DA3',
            icon: '1️⃣',
          },
          {
            title: 'Phase 2',
            description: 'Next step in the sequence',
            color: '#10B981',
            icon: '2️⃣',
          },
          {
            title: 'Phase 3',
            description: 'Final result',
            color: '#8B5CF6',
            icon: '3️⃣',
          },
        ],
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Live Examples',
      } as ContentBlock,
      {
        type: 'code-playground',
      } as ContentBlock,
      {
        type: 'heading',
        level: 2,
        content: 'Summary',
      } as ContentBlock,
      {
        type: 'list',
        variant: 'checkmark',
        colored: true,
        items: [
          'Core concept explained',
          'Visual understanding achieved',
          'Hands-on practice completed',
          'Ready to apply in projects',
        ],
      } as ContentBlock,
    ],
  },
};