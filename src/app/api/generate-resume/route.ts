import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { generateResumePDF, ResumeData } from '@/lib/resumeTemplate';
import {
  personalInfo,
  experiences,
  education,
  projects,
  skills,
  socialLinks,
} from '@/lib/data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST() {
  try {
    // Prepare the portfolio data for Claude
    const portfolioData = {
      personalInfo,
      experiences,
      education,
      projects,
      skills,
      socialLinks,
    };

    // Use Claude to generate a polished resume
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are helping generate a professional one-page resume. Based on the following portfolio data, create a polished resume in JSON format.

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}

Generate a JSON response with EXACTLY this structure (no markdown, just raw JSON):
{
  "summary": "A 2-3 sentence professional summary highlighting current role, expertise, and career focus. Should mention PhD completed in Dec 2025, current role at Luminary Cloud, and expertise in SciML/GNNs/HPC.",
  "experience": [
    {
      "company": "Company Name",
      "role": "Role Title",
      "period": "Date Range",
      "location": "City, State",
      "bullets": ["Achievement 1 with metrics", "Achievement 2 with impact"],
      "tools": "Programming: X, Y; ML: A, B; HPC: C, D"
    }
  ],
  "projects": [
    {
      "title": "Project Title",
      "period": "Date Range",
      "bullets": ["What was built", "Key results/impact"],
      "publication": "Paper title if applicable",
      "publicationLink": "URL if applicable"
    }
  ],
  "leadership": ["Leadership item 1", "Leadership item 2"]
}

IMPORTANT GUIDELINES:
1. The summary should reflect that the PhD was COMPLETED in December 2025 (not "candidate")
2. Current role is Forward Deployed Engineer at Luminary Cloud (Jan 2026 - Present)
3. Keep bullet points concise but impactful with quantifiable achievements where possible
4. For experience, include relevant tools used
5. For projects, include publication info with ArXiv links
6. Include 2 leadership items: mentoring honors student and delivering ML lectures
7. Make sure all content fits on ONE page (limit bullets, be concise)

Return ONLY the JSON, no explanation or markdown formatting.`,
        },
      ],
    });

    // Extract the text content from Claude's response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse the JSON response
    let generatedContent;
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : responseText;
      generatedContent = JSON.parse(jsonStr.trim());
    } catch {
      console.error('Failed to parse Claude response:', responseText);
      throw new Error('Failed to parse resume content from AI');
    }

    // Construct the full resume data
    const resumeData: ResumeData = {
      name: personalInfo.name,
      email: personalInfo.email,
      workEmail: personalInfo.workEmail,
      location: personalInfo.location,
      linkedinUrl: socialLinks.linkedin,
      githubUrl: socialLinks.github,
      summary: generatedContent.summary,
      education: education.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field || undefined,
        period: edu.period,
        location: edu.location,
        gpa: edu.id === 'pennstate' ? '3.85' : undefined,
      })),
      experience: generatedContent.experience,
      projects: generatedContent.projects,
      skills: {
        programming: skills.programming.items,
        ml: skills.ml.items,
        hpc: skills.hpc.items,
        simulation: skills.simulation.items,
      },
      leadership: generatedContent.leadership,
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
