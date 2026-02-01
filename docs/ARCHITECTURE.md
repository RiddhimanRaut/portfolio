# Architecture

## Overview

This portfolio is built as a modern, performant single-page application using Next.js 15 with the App Router.

## Tech Stack Decisions

### Next.js 15 (App Router)

- Server-side rendering for SEO and performance
- App Router for modern React patterns (Server Components, Streaming)
- Built-in optimizations (Image, Font, Script)

### TypeScript

- Type safety across the codebase
- Better developer experience with autocomplete and refactoring
- Self-documenting code

### Tailwind CSS

- Utility-first approach for rapid styling
- Minimal CSS bundle with purging
- Consistent design tokens

### Framer Motion

- Declarative animations
- Physics-based motion
- Gesture support

## Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout (fonts, metadata)
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/              # Reusable UI primitives
│   └── sections/        # Page sections
├── hooks/               # Custom React hooks
└── lib/                 # Utilities and helpers
```

## Key Patterns

### Component Organization

- **UI Components:** Reusable, presentational components
- **Section Components:** Page-specific sections (Hero, About, Projects)
- **Layout Components:** Structural components (Header, Footer)

### Animation Strategy

- Use Framer Motion's `motion` components for animated elements
- Leverage `useReducedMotion` for accessibility
- Keep animations subtle and purposeful

### Styling Conventions

- Use Tailwind utilities directly in components
- Extract repeated patterns to component classes
- Use CSS variables for dynamic theming

## Performance Considerations

- Lazy load below-the-fold content
- Optimize images with `next/image`
- Use dynamic imports for heavy components
- Minimize client-side JavaScript
