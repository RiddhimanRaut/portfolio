'use client';

import Section from '@/components/ui/Section';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <Section id="projects">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
        Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            period={project.period}
            description={project.description}
            tags={project.tags}
            publication={'publication' in project ? project.publication : undefined}
            link={'link' in project ? project.link : undefined}
            links={'links' in project ? project.links : undefined}
            images={'images' in project ? project.images : undefined}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
