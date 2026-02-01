'use client';

import { EpochSection } from '@/components/EpochReveal';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <EpochSection id="projects">
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
            publication={project.publication}
            link={project.link}
            images={project.images}
            index={index}
          />
        ))}
      </div>
    </EpochSection>
  );
}
