import { NextResponse } from 'next/server';
import { generateResumePDF, ResumeData } from '@/lib/resumeTemplate';
import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  socialLinks,
} from '@/lib/data';

export async function POST() {
  try {
    // Build resume data directly from portfolio data
    const resumeData: ResumeData = {
      name: personalInfo.name,
      email: personalInfo.email,
      workEmail: personalInfo.workEmail,
      location: personalInfo.location,
      linkedinUrl: socialLinks.linkedin,
      githubUrl: socialLinks.github,
      googleScholarUrl: socialLinks.googleScholar,
      summary: `Forward Deployed Engineer at Luminary Cloud with a Ph.D. in Mechanical Engineering and Computational Science from Penn State (Dec 2025). Expertise in scientific machine learning, graph neural networks, and high-performance computing. Experienced in developing efficient, scalable surrogate models for complex physics simulations.`,
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
          ? 'Cloud Infrastructure, CFD/FEA, Python, Simulation Workflows'
          : exp.id === 'pasteur'
          ? 'Python (JAX, PyTorch), GNNs, Neural Operators, CUDA, Azure ML'
          : undefined,
      })),
      projects: projects.map((proj) => ({
        title: proj.title,
        period: proj.period,
        bullets: [proj.description],
        publication: proj.publication ? proj.title : undefined,
        publicationLink: proj.link,
      })),
      skills: {
        programming: skills.programming.items,
        ml: skills.ml.items,
        hpc: skills.hpc.items,
        simulation: skills.simulation.items,
      },
      leadership: [
        'Mentoring Schreyer Honors student in research on Geometric Neural Operators and Diffusion Models',
        'Delivered graduate-level lectures on machine learning',
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
