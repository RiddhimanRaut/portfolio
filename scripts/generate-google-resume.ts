/**
 * Generate a Google-flavored resume PDF locally.
 *
 *   npm run resume:google
 *   → emits ./resume-google.pdf
 *
 * Imports shared content from src/lib/data.ts and the same PDF template used
 * by the website, applies Google-specific overrides, and writes the file to
 * the project root (gitignored via `resume-*.pdf`).
 */

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  socialLinks,
} from '../src/lib/data';
import { generateResumePDF, type ResumeData } from '../src/lib/resumeTemplate';

const data: ResumeData = {
  name: personalInfo.name,
  email: personalInfo.email,
  workEmail: personalInfo.workEmail,
  location: personalInfo.location,
  portfolioUrl: 'https://riddhimanraut.vercel.app',
  linkedinUrl: socialLinks.linkedin,
  githubUrl: socialLinks.github,
  googleScholarUrl: socialLinks.googleScholar,

  // Google-flavored summary: breadth-led with production-ML lean
  // (GCP / Argo Workflows live in the skills row + Luminary tools field, not the summary, to keep one-page fit)
  summary: `ML engineer building Physics AI surrogates for production. Research and production experience spanning graph neural networks, transformer-based PDE solvers, and neural operators across crash, CFD/turbulence, and additive manufacturing. Recently developed SHIFT-Crash, the first Physics AI for full-vehicle crash prediction. Ph.D. in Mechanical Engineering & Computational Science (Penn State, Dec 2025), specializing in SciML.`,

  education: education.map((edu) => ({
    institution: edu.institution,
    degree: edu.degree,
    field: edu.field || undefined,
    period: edu.period,
    location: edu.location,
    gpa: edu.id === 'pennstate' ? '3.85' : undefined,
  })),

  experience: experiences.map((exp) => ({
    company: exp.company,
    role: exp.role,
    period: exp.period,
    location: exp.location,
    bullets: exp.description,
    tools:
      exp.id === 'luminary'
        ? 'Physics AI, PyTorch, JAX, GCP, Argo Workflows, Python'
        : exp.id === 'pasteur'
          ? 'Python (JAX, PyTorch), GNNs, Neural Operators, CUDA, Azure ML'
          : undefined,
    links: 'links' in exp ? exp.links : undefined,
  })),

  projects: projects
    .filter((proj) => proj.id !== 'shift-crash')
    .map((proj) => ({
      title: proj.title,
      period: proj.period,
      bullets: [proj.description],
      publication:
        'publicationTitle' in proj && proj.publicationTitle
          ? proj.publicationTitle
          : 'publication' in proj && proj.publication
            ? proj.title
            : undefined,
      publicationVenue:
        'publicationVenue' in proj ? proj.publicationVenue : undefined,
      publicationLink: 'link' in proj ? proj.link : undefined,
    })),

  // Google variant: reorder ML row to lead with generalist stack;
  // move niche Physics AI tools into their own row so a Google generalist
  // reviewer doesn't pre-classify as physics-only.
  skills: {
    programming: skills.programming.items,
    ml: ['PyTorch', 'JAX', 'TensorFlow', 'GNNs', 'Transformers', 'Neural Operators', 'LLMs'],
    hpc: ['CUDA', 'MPI', 'OpenMP', 'Slurm', 'GCP (Compute Engine, GCS)', 'Argo Workflows', 'AWS', 'Azure ML'],
    simulation: skills.simulation.items,
    physicsAiStack: ['PhysicsNeMo', 'Transolver', 'DoMINO', 'GeoTransolver', 'OpenRadioss'],
  },

  // Talks/press section omitted from Google variant; the SAE talk is implicit in
  // experience bullet 3 and the section costs a line that's better spent on the
  // Physics AI Stack skill row.

  leadership: [
    'Honors undergrad mentor (neural operators, diffusion); graduate-level ML lecturer',
  ],
};

async function main() {
  const buffer = await generateResumePDF(data);
  const outPath = resolve(process.cwd(), 'resume-google.pdf');
  await writeFile(outPath, new Uint8Array(buffer));
  console.log(`✓ Wrote ${outPath} (${buffer.length} bytes)`);
}

main().catch((err) => {
  console.error('Failed to generate Google resume:', err);
  process.exit(1);
});
