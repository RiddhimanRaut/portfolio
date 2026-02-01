# Portfolio Project - Conversation Log

## Session: February 1, 2026

### Summary
Continued work on AI-themed portfolio features, added a dynamic resume generator, set up SEO, and configured custom Vercel subdomain.

### What Was Done

#### 1. Removed Epoch Loaders
- Removed epoch-style section reveal animations that were causing lag during scrolling
- Kept the hyperparameter sliders and cursor-interactive stars

#### 2. Added Resume Generator Feature
- Created a "Download Resume" button in the Contact section
- Generates PDF dynamically from `data.ts` using `@react-pdf/renderer`
- Initially built with Claude API integration, then simplified to template-only approach (no API costs)
- PDF follows Harvard resume format with clean, professional styling

#### 3. Resume Formatting & Content
- Fixed formatting: Ph.D. (not PhD), B.E. (not BE)
- Full university name: "The Pennsylvania State University"
- Education period: "Aug 2022 - Dec 2025"
- Added professional summary/bio section
- Added Google Scholar link alongside LinkedIn and GitHub
- Combined contact info and social links on single line
- Updated Scalable GNNs project to peer-reviewed ScienceDirect link

#### 4. Resume Styling (Harvard Format)
- Balanced spacing to fit on 1 page
- 17pt name, 10pt body text
- Page padding: 34pt vertical, 46pt horizontal
- Proper section dividers
- Right-aligned dates and locations
- Justified summary text

#### 5. SEO Enhancements
- Enhanced metadata with comprehensive keywords
- Added Open Graph and Twitter card tags
- Created `robots.txt` for crawler guidance
- Created dynamic `sitemap.ts`
- Canonical URL: `riddhimanraut.vercel.app`

#### 6. Custom Domain Setup
- Set up free Vercel subdomain: `riddhimanraut.vercel.app`
- Configured deployment protection to allow public access to production
- Updated all SEO files with correct URL

### Key Files Modified
- `src/lib/resumeTemplate.tsx` - PDF template with Harvard format styling
- `src/app/api/generate-resume/route.ts` - API endpoint for PDF generation
- `src/components/ResumeButton.tsx` - Download button component
- `src/components/sections/Contact.tsx` - Added resume button
- `src/lib/data.ts` - Updated education formatting, project links
- `src/app/layout.tsx` - Enhanced SEO metadata
- `src/app/sitemap.ts` - Dynamic sitemap for Google
- `public/robots.txt` - Crawler guidance

### Current State
- **Website live at: https://riddhimanraut.vercel.app**
- Resume generator working with 1-page Harvard format
- Hyperparameter sliders in About section functional
- Cursor-interactive stars in space background working
- SEO configured and ready for Google indexing

### Notes for Next Session
- Resume pulls from `data.ts` - update that file to update resume content
- To regenerate resume after data changes, just redeploy with `vercel --prod`
- Consider adding more experiences/projects as career progresses
- To start session: "Read CONVERSATION_LOG.md to get context"

### How to Get Found on Google

1. **Submit to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add `riddhimanraut.vercel.app` as a URL prefix property
   - Verify ownership
   - Submit sitemap: `https://riddhimanraut.vercel.app/sitemap.xml`
   - Request indexing for homepage

2. **Add Backlinks**
   - Add portfolio URL to LinkedIn, GitHub, Google Scholar profiles
   - These backlinks significantly boost Google ranking

---

*Log maintained for context continuity across sessions.*
