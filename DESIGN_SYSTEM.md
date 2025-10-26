# DThompsonDev Design System

## Overview
This document outlines the design system for the DThompsonDev website, capturing colors, typography, spacing, animations, and component patterns used throughout the application.

## Technology Stack
- **Framework**: Next.js 15.5.6 with React 19
- **Styling**: Tailwind CSS v4 with custom CSS
- **Animations**: Framer Motion 12.23.24
- **Typography**: Geist Sans and Geist Mono fonts

---

## Color Palette

### Primary Colors
Our design system is built around three core colors that represent technical excellence and community:

```css
/* Primary Green-Teal */
#E2F3F2  /* Background mint - Main page background */
#153230  /* Deep forest green - Primary brand color, text, buttons */

/* Secondary Blue-Steel */
#4D7DA3  /* Steel blue - Secondary brand color, accents */
#3d6a8a  /* Darker steel blue - Hover states */

/* Tertiary Gold-Olive */
#84803E  /* Olive gold - Tertiary accent color */
#6a6731  /* Darker olive - Hover states */
```

### Supporting Colors
```css
/* Neutrals */
#ffffff  /* Pure white - Card backgrounds, text on dark */
#171717  /* Near black - Dark mode foreground */
#0a0a0a  /* Deep black - Dark mode background */
#ededed  /* Light gray - Dark mode foreground */

/* Semantic Colors */
#4ade80  /* Success green - Status indicators, metrics */
#DC2626  /* Error red - Used in polaroid pins */
#EAB308  /* Warning yellow - Polaroid pins */
#3B82F6  /* Info blue - Polaroid pins */
#8B5CF6  /* Purple - Polaroid pins */
#EC4899  /* Pink - Polaroid pins */
#06B6D4  /* Cyan - Polaroid pins */
#14B8A6  /* Teal - Polaroid pins */
#10B981  /* Emerald - Polaroid pins */
#F59E0B  /* Amber - Polaroid pins */
#EF4444  /* Red - Error states, diagrams */
```

### Code Playground Colors
```css
/* Playground UI */
#9bcdf6  /* Light blue - Playground header/footer background */
#164063  /* Dark blue - Playground UI text */
#5a9bd4  /* Medium blue - Active tabs, buttons */
#3a7fb8  /* Darker blue - Button gradients */
#e8f4fd  /* Very light blue - Playground panel backgrounds */
#f8fcfe  /* Near white blue - Alternate panels */
#f0f8fc  /* Light blue - Output panel */

/* Code Editor */
#0d1117  /* Dark background - Code blocks and editor background */
#263238  /* Dark text - Default code text */

/* Syntax Highlighting */
#6A9955  /* Green - Comments */
#E65100  /* Orange - Keywords, operators */
#00838F  /* Teal - Built-ins, functions */
#7B1FA2  /* Purple - Strings */

/* macOS Window Dots */
#ff5f57  /* Red dot */
#febc2e  /* Yellow dot */
#28c840  /* Green dot */
```

### Rich Text Editor Colors
```css
/* Text Formatting Presets */
#153230  /* Dark green */
#4D7DA3  /* Steel blue */
#10B981  /* Emerald green */
#EF4444  /* Red */
#F59E0B  /* Amber */
#8B5CF6  /* Purple */
#EC4899  /* Pink */
```

### Gradients
```css
/* Primary Gradient - Used for text effects and buttons */
linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)

/* Brand Gradients */
linear-gradient(135deg, #4D7DA3, #153230)  /* Brand gradient */
linear-gradient(to-br, from-#4D7DA3/20, via-#84803E/20, to-#153230/20)  /* Ambient lighting */
```

---

## Typography

### Font Families
```css
--font-geist-sans: Geist Sans  /* Primary sans-serif font */
--font-geist-mono: Geist Mono  /* Monospace font for code */
```

### Typography Scale
- **Hero Text**: `text-5xl md:text-6xl lg:text-7xl` (48px/60px/72px)
- **H1**: `text-3xl md:text-5xl` (30px/48px)
- **H2**: `text-2xl md:text-4xl` (24px/36px)
- **H3**: `text-xl md:text-2xl` (20px/24px)
- **Body Large**: `text-lg md:text-xl` (18px/20px)
- **Body**: `text-base md:text-lg` (16px/18px)
- **Body Small**: `text-sm md:text-base` (14px/16px)
- **Caption**: `text-xs md:text-sm` (12px/14px)

### Font Weights
- **Black**: `font-black` (900) - Headlines, important text
- **Bold**: `font-bold` (700) - Emphasis, buttons
- **Semibold**: `font-semibold` (600) - Navigation, labels
- **Regular**: Default weight for body text

---

## Spacing & Layout

### Container System
```css
max-w-[1400px]  /* Main container width */
max-w-6xl       /* Content sections */
max-w-4xl       /* Text content */
max-w-3xl       /* Narrow text blocks */
```

### Padding Scale
- **Micro**: `p-1.5, p-2` (6px, 8px)
- **Small**: `p-3, p-4` (12px, 16px)
- **Medium**: `p-5, p-6` (20px, 24px)
- **Large**: `p-8, p-10` (32px, 40px)
- **XL**: `p-16, p-20` (64px, 80px)
- **XXL**: `p-32` (128px)

### Margin Scale
Follows same scale as padding with responsive variants:
- Mobile-first: `py-6 md:py-8` 
- Section spacing: `py-16 md:py-20`
- Hero spacing: `py-20 md:py-32`

### Border Radius Scale
- **Small**: `rounded-lg` (8px) - Images, small elements
- **Medium**: `rounded-xl` (12px) - Buttons, icons
- **Large**: `rounded-2xl` (16px) - Cards, containers
- **XL**: `rounded-[24px]` (24px) - Feature cards
- **XXL**: `rounded-[32px]` (32px) - Main sections

---

## Component Patterns

### Cards
```css
/* Glass Card Effect */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Standard Card */
bg-white rounded-[32px] shadow-xl border border-[#4D7DA3]/10
```

### Buttons
```css
/* Primary Button */
bg-[#153230] text-white px-6 md:px-8 py-3 md:py-4 rounded-full 
hover:bg-[#4D7DA3] hover:scale-105 transition-all duration-300

/* Secondary Button */
bg-[#4D7DA3] text-white px-10 py-5 rounded-full 
hover:shadow-2xl hover:scale-105 transition-all duration-300
```

### Navigation
```css
/* Navigation Links */
text-[#153230]/70 hover:text-[#153230] font-semibold transition-colors
```

---

## Animations & Effects

### CSS Custom Animations

#### Reveal Animation
```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

#### Slide Down Notification
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
/* Used for save notifications in blog editor */
```

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Used for component menus and dialogs */
```

#### Gradient Text Animation
```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

#### Tilt Card Effect
```css
.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.tilt-card:hover {
  transform: perspective(1000px)
    rotateX(var(--rotate-x, 0deg))
    rotateY(var(--rotate-y, 0deg))
    scale(1.02);
}
```

#### Shimmer Effect
```css
.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

#### ContentEditable Placeholder
```css
[contenteditable].empty:before {
  content: attr(data-placeholder);
  color: #9CA3AF;
  pointer-events: none;
}

[contenteditable]:focus {
  outline: none;
}
/* Provides placeholder text for rich text editor */
```

### Transitions
- **Standard**: `transition-all duration-300`
- **Smooth**: `transition-all duration-500`
- **Long**: `transition-all duration-700`
- **Color**: `transition-colors`
- **Transform**: `transition-transform`

### Framer Motion Patterns
```typescript
// Slide in from right (used in OrbitSwitcher detail panel)
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}

// Fade with scale (used in mode switching)
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -12 }}
transition={{ duration: 0.3 }}

// Staggered reveals (used in orbit personas)
transition={{ delay: i * 0.08 }}
```

---

## Interactive States

### Hover States
- **Scale**: `hover:scale-105` (5% scale up)
- **Shadow**: `hover:shadow-2xl, hover:shadow-xl`
- **Opacity**: `hover:opacity-80`
- **Color**: `hover:bg-[color]`

### Focus States
- **Outline**: `outline-none` (custom focus styles implemented)
- **Ring**: Using Tailwind's ring utilities when needed

### Active States
- **Pressed**: Typically uses scale-down effect
- **Loading**: Pulse animations for status indicators

---

## Layout Patterns

### Grid Systems
```css
/* Hero Section */
grid lg:grid-cols-2 gap-16 items-center

/* Feature Cards */
grid md:grid-cols-2 gap-6
grid md:grid-cols-4 gap-4 md:gap-6

/* Statistics */
flex gap-8
```

### Flexbox Patterns
```css
/* Navigation */
flex items-center justify-between gap-8

/* Button Groups */
flex flex-wrap items-center gap-4

/* Icon + Text */
flex items-center gap-3
```

---

## Accessibility Considerations

### Color Contrast
- Primary text `#153230` on white provides excellent contrast
- Secondary text uses `#153230/70` (70% opacity) for hierarchy
- Button text uses sufficient contrast ratios

### Focus Management
- Custom focus styles remove default outline
- Interactive elements have clear hover/focus states
- Proper semantic HTML structure

### Responsive Design
- Mobile-first approach with `md:` breakpoints
- Flexible typography scale
- Adaptive spacing and sizing

---

## Special Components

### BentoGrid (Polaroid Gallery)
- Uses absolute positioning with CSS transforms
- Colorful pin system with specific brand colors
- Hover effects with scale and rotation animations
- Perspective and 3D transforms for depth

### Scroll Reveal
- Intersection Observer API
- Staggered animation delays
- Smooth opacity and transform transitions

### Tilt Card
- Mouse tracking for 3D tilt effect
- CSS custom properties for rotation values
- Perspective transforms for realistic 3D effect

### OrbitSwitcher
- Framer Motion powered animations
- SVG curved connection paths
- Interactive persona orbits
- Dual mode display (Orbit/Rooms)
- Top shadow: `0 -10px 30px -10px rgba(77, 125, 163, 0.3)`

### Blog Editor Components

#### RichTextEditor
- ContentEditable with syntax parsing
- Floating formatting toolbar on text selection
- Markdown-style syntax (`**bold**`, `*italic*`, `__underline__`, `[text](url)`)
- Inline color picker with 6 preset colors
- Keyboard shortcuts (Ctrl+B/I/U/K)

#### SlashCommandMenu
- Type `/` for quick component insertion
- Fuzzy search filtering
- Arrow key navigation
- Keyboard-first workflow
- Dark highlight on selection (`bg-[#4D7DA3]`)

#### LinkDialog
- Modal for inserting hyperlinks
- Auto-adds https:// protocol
- Clean form design with focus states
- Keyboard shortcuts (Enter/Esc)

#### CodePlayground
- Split-pane interactive code editor
- Live JavaScript execution
- Syntax highlighting with custom colors
- Multiple language tabs (TypeScript, CSS, JS)
- Console output and visual preview modes
- macOS-style window chrome
- Line numbers with rainbow colors
- Fully opaque status bar: `backgroundColor: '#9bcdf6'`

### Blog Content Components

#### CodeMorph
- Animated code transformations
- Step-by-step code evolution
- Syntax highlighting with custom theme

#### InteractiveCode
- Tabbed code examples
- Color-coded explanations
- Dark terminal theme (`bg-[#0d1117]`)

#### AnimatedDiagram
- Step cards with custom colors and icons
- Progress indicator
- Smooth transitions between steps

#### CodeSteps
- Numbered step walkthrough
- Code blocks with descriptions
- Clean card-based layout

#### VirtualWhiteboard
- HTML5 Canvas drawing
- 7 color palette
- Brush size control
- Clear/download functionality

---

## Design Principles

1. **Professional yet Approachable**: Clean typography with friendly animations
2. **Community-Focused**: Warm color palette representing growth and connection
3. **Technical Excellence**: Crisp edges, precise spacing, attention to detail
4. **Performance-First**: Optimized animations and efficient CSS
5. **Accessible**: High contrast, semantic structure, keyboard navigation

---

## Usage Guidelines

### Do's
✅ Use the primary color palette consistently
✅ Maintain consistent spacing scale
✅ Apply hover states to interactive elements
✅ Use appropriate typography hierarchy
✅ Implement smooth transitions

### Don'ts
❌ Mix different border radius scales arbitrarily
❌ Use colors outside the defined palette
❌ Skip responsive design considerations
❌ Overuse animations (maintain subtle, purposeful motion)
❌ Ignore accessibility requirements

---

## File Organization

```
src/
├── app/
│   ├── globals.css                    # Global styles and animations
│   ├── layout.tsx                     # Font configuration
│   ├── page.tsx                       # Homepage
│   ├── blog/
│   │   ├── page.tsx                   # Blog listing (with Suspense for useSearchParams)
│   │   ├── [slug]/page.tsx            # Dynamic blog post pages
│   │   ├── closures-visualized/       # Example article
│   │   └── react-hooks-visualized/    # Example article with playground
│   └── admin/
│       ├── posts/new/page.tsx         # Blog post editor (rich features)
│       └── [other admin pages]
├── components/
│   ├── BentoGrid.tsx                  # Polaroid gallery component
│   ├── TiltCard.tsx                   # 3D tilt interaction
│   ├── ScrollReveal.tsx               # Intersection Observer animations
│   ├── OrbitSwitcher.tsx              # Persona selector with Framer Motion
│   ├── BlogRenderer.tsx               # Renders all blog content blocks
│   ├── RichTextEditor.tsx             # Rich text with inline formatting
│   ├── LinkDialog.tsx                 # Link insertion modal
│   ├── SlashCommandMenu.tsx           # "/" command component picker
│   ├── CodePlayground.tsx             # Interactive code editor
│   ├── CodeMorph.tsx                  # Animated code transitions
│   ├── InteractiveCode.tsx            # Tabbed code examples
│   ├── AnimatedDiagram.tsx            # Step-by-step visuals
│   ├── CodeSteps.tsx                  # Code walkthroughs
│   ├── VirtualWhiteboard.tsx          # Drawing canvas
│   ├── FloatingTOC.tsx                # Table of contents
│   └── ScrollProgress.tsx             # Reading progress bar
├── hooks/
│   └── useUndoRedo.ts                 # Undo/redo state management
├── lib/
│   ├── components-registry.ts         # Available component types (14 types)
│   └── component-templates.ts         # Full-page article templates (10 templates)
└── types/
    └── blog.ts                        # TypeScript interfaces for blog system
```

## Blog Editor System

### Component Registry (14 Types)
1. **text** - Rich formatted text with inline styles
2. **heading** - H1/H2/H3 with auto-generated IDs
3. **code-morph** - Animated code transformations
4. **interactive-code** - Tabbed examples with explanations
5. **animated-diagram** - Step-by-step visual diagrams
6. **code-steps** - Code walkthroughs
7. **image** - Upload/paste with captions
8. **quote** - Blockquotes with optional attribution
9. **callout** - Info boxes (4 variants: info, warning, success, error)
10. **code-block** - Syntax highlighted code (7 languages)
11. **button** - Interactive buttons (3 styles)
12. **list** - Styled lists (bullet, numbered, checkmark)
13. **code-playground** - Live code execution environment
14. **whiteboard** - Always included (drawing canvas for readers)

### Article Templates (10 Available)
**Quick Templates:**
- 3-Step Tutorial
- Key Takeaways
- Before/After Code
- Interactive Demo
- Visual Concept
- Feature Highlight
- Problem → Solution

**Full-Page Templates:**
- Complete Tutorial Article (intro, code-morph, playground, patterns, takeaways)
- Concept Deep Dive (definition, diagrams, playground, use cases, summary)
- Technology Comparison (side-by-side with playground demos)

### Editor Features
- **Slash Commands**: Type `/` for instant component insertion
- **Undo/Redo**: Ctrl+Z/Y with 50-state history
- **Rich Text**: Inline bold, italic, underline, colors, links
- **Auto-save**: Every 3 seconds with visual confirmation
- **Word Count**: Real-time with auto-calculated read time
- **Drag-and-Drop**: Visual block reordering
- **Image Paste**: Direct screenshot upload
- **Preview Mode**: See exactly what readers will see
- **Focus Mode**: Distraction-free dark theme writing
- **SEO Fields**: Meta description, keywords, OG image with Google preview

This design system ensures consistency across the DThompsonDev brand while maintaining flexibility for growth and evolution.