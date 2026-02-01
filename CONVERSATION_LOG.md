# Portfolio Project - Conversation Log

## Session: February 1, 2026

### Summary
Continued work on AI-themed portfolio features and added a dynamic resume generator.

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

#### 4. Resume Styling
- Harvard format with tight, balanced spacing
- 17pt name, 10pt body text
- Proper section dividers
- Right-aligned dates and locations
- Justified summary text

### Key Files Modified
- `src/lib/resumeTemplate.tsx` - PDF template with Harvard format styling
- `src/app/api/generate-resume/route.ts` - API endpoint for PDF generation
- `src/components/ResumeButton.tsx` - Download button component
- `src/components/sections/Contact.tsx` - Added resume button
- `src/lib/data.ts` - Updated education formatting, project links

### Current State
- Website live at: https://portfolio-sandy-six-9s9jj8po42.vercel.app
- Resume generator working with 1-page Harvard format
- Hyperparameter sliders in About section functional
- Cursor-interactive stars in space background working

#### 5. SEO Enhancements
- Enhanced metadata with comprehensive keywords
- Added Open Graph and Twitter card tags
- Created `robots.txt` for crawler guidance
- Created dynamic `sitemap.ts`
- Canonical URL set to `riddhimanraut.com` (pending custom domain setup)

### Notes for Next Session
- Resume pulls from `data.ts` - update that file to update resume content
- To regenerate resume after data changes, just redeploy
- Consider adding more experiences/projects as career progresses
- **Custom domain setup pending** - see instructions below

### How to Get Found on Google

#### Step 1: Get a Custom Domain
1. Buy `riddhimanraut.com` from Namecheap, Google Domains, or Cloudflare (~$10-12/year)
2. In Vercel dashboard → Project Settings → Domains
3. Add your domain and follow DNS configuration instructions
4. Once connected, update `sitemap.ts` and `robots.txt` if using different domain

#### Step 2: Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add your domain as a property
3. Verify ownership (Vercel makes this easy with DNS verification)
4. Submit your sitemap: `https://riddhimanraut.com/sitemap.xml`
5. Request indexing for your homepage

#### Step 3: Boost Visibility
- Link your portfolio from LinkedIn, GitHub, Google Scholar profiles
- These backlinks help Google rank your site
- Keep content updated (Google favors fresh content)

---

*Log maintained for context continuity across sessions.*
