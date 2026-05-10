import { NextResponse } from 'next/server';
import { generateResumePDF, ResumeData } from '@/lib/resumeTemplate';
import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  socialLinks,
  talks,
} from '@/lib/data';

export async function POST() {
  try {
    // Build resume data directly from portfolio data
    const resumeData: ResumeData = {
      name: personalInfo.name,
      email: personalInfo.email,
      workEmail: personalInfo.workEmail,
      location: personalInfo.location,
      portfolioUrl: 'https://riddhimanraut.vercel.app',
      linkedinUrl: socialLinks.linkedin,
      githubUrl: socialLinks.github,
      googleScholarUrl: socialLinks.googleScholar,
      summary: `ML engineer building Physics AI surrogates for high-fidelity simulation. Research and production experience spanning graph neural networks, transformer-based PDE solvers, and neural operators across crash, CFD/turbulence, and additive manufacturing. Recently developed SHIFT-Crash, the first Physics AI for full-vehicle crash prediction.`,
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
        tools: exp.id === 'luminary'
          ? 'Physics AI, CFD/FEA, Python, Cloud Simulation Workflows'
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
      skills: {
        programming: skills.programming.items,
        ml: skills.ml.items,
        hpc: skills.hpc.items,
        simulation: skills.simulation.items,
      },
      talksAndPress: talks.map((t) => ({
        kind: 'talk' as const,
        text: `${t.title} · ${t.venue} (${t.date})`,
      })),
      leadership: [
        'Mentored Schreyer Honors student in research on Geometric Neural Operators and Diffusion Models',
        'Delivered graduate-level lectures on machine learning to classes of 30+ students',
      ],
    };

    // Generate PDF
    const pdfBuffer = await generateResumePDF(resumeData);

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF as downloadable file
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Resume_${personalInfo.name.replace(/\s+/g, '_')}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Resume generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}

// Also support GET for simple testing
export async function GET() {
  return POST();
}
