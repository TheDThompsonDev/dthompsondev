export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  content: BlogContent;
  category?: string;
  featured: boolean;
  status: 'draft' | 'published';
  readTime?: string;
  coverImageUrl?: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  seo?: {
    metaDescription?: string;
    focusKeyword?: string;
    ogImage?: string;
  };
  targetPersonas?: string[];
}

export interface BlogContent {
  blocks: ContentBlock[];
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | CodeMorphBlock
  | InteractiveCodeBlock
  | AnimatedDiagramBlock
  | WhiteboardBlock
  | ImageBlock
  | QuoteBlock
  | CalloutBlock
  | CodeBlock
  | ButtonBlock
  | ListBlock
  | CodePlaygroundBlock
  | CodeStepsBlock;

export interface TextBlock {
  type: 'text';
  content: string;
}

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  content: string;
  id?: string;
}

export interface CodeMorphBlock {
  type: 'code-morph';
  title: string;
  steps: {
    title: string;
    description: string;
    code: string;
  }[];
}

export interface CodeStepsBlock {
  type: 'code-steps';
  steps: {
    title: string;
    description: string;
    code: string;
  }[];
}

export interface InteractiveCodeBlock {
  type: 'interactive-code';
  title?: string;
  examples: {
    title: string;
    code: string;
    explanation: string;
    color: string;
  }[];
}

export interface AnimatedDiagramBlock {
  type: 'animated-diagram';
  title: string;
  steps: {
    title: string;
    description: string;
    color: string;
    icon?: string;
  }[];
}

export interface WhiteboardBlock {
  type: 'whiteboard';
  title?: string;
  height?: number;
}

export interface ImageBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface QuoteBlock {
  type: 'quote';
  content: string;
  author?: string;
}



export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'warning' | 'success' | 'error';
  title: string;
  content: string;
  icon?: string;
}

export interface CodeBlock {
  type: 'code-block';
  title?: string;
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export interface ButtonBlock {
  type: 'button';
  text: string;
  action: string;
  variant: 'primary' | 'secondary' | 'ghost';
}

export interface ListBlock {
  type: 'list';
  items: string[];
  variant: 'bullet' | 'numbered' | 'checkmark';
  colored?: boolean;
}

export interface CodePlaygroundBlock {
  type: 'code-playground';
  title?: string;
}

export interface UploadedFile {
  id: number;
  file_name: string;
  blob_url: string;
  file_type?: string;
  file_size?: number;
  uploaded_at: string;
}