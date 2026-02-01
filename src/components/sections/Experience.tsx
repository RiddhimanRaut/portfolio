'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import TimelineItem from '@/components/ui/TimelineItem';
import { experiences, education } from '@/lib/data';

export default function Experience() {
  return (
    <Section id="experience">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
        Experience
      </h2>

      <div className="max-w-2xl">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            location={exp.location}
            current={exp.current}
            description={exp.description}
            logo={exp.logo}
            index={index}
          />
        ))}
      </div>

      <h3 className="mb-8 mt-16 text-2xl font-bold text-white">Education</h3>

      <div className="max-w-2xl">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8"
          >
            <div className="absolute top-0 left-0 flex h-full flex-col items-center">
              <div className="h-3 w-3 rounded-full border-2 border-zinc-600 bg-zinc-900" />
            </div>

            <div className="flex items-center gap-4">
              {edu.logo && (
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white p-1">
                  <Image
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h4 className="text-xl font-semibold text-white">
                  {edu.institution}
                </h4>
                <p className="text-slate-300">
                  {edu.degree}{edu.field && ` · ${edu.field}`}
                </p>
                <p className="text-sm text-slate-500">
                  {edu.period} &middot; {edu.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
