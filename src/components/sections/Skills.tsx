'use client';

import { motion } from 'framer-motion';
import { EpochSection } from '@/components/EpochReveal';
import { skills } from '@/lib/data';

const categoryIcons: Record<string, React.ReactNode> = {
  programming: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  ml: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  hpc: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  simulation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
};

const categoryColors: Record<string, { border: string; accent: string; glow: string }> = {
  programming: { border: 'border-blue-500/30', accent: 'text-blue-400', glow: 'group-hover:shadow-blue-500/10' },
  ml: { border: 'border-purple-500/30', accent: 'text-purple-400', glow: 'group-hover:shadow-purple-500/10' },
  hpc: { border: 'border-emerald-500/30', accent: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
  simulation: { border: 'border-orange-500/30', accent: 'text-orange-400', glow: 'group-hover:shadow-orange-500/10' },
};

export default function Skills() {
  const skillEntries = Object.entries(skills) as [string, { label: string; items: string[] }][];

  return (
    <EpochSection id="skills">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">Skills</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skillEntries.map(([key, category], index) => {
          const colors = categoryColors[key] || categoryColors.programming;
          const icon = categoryIcons[key];

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group rounded-2xl border ${colors.border} bg-zinc-900/30 p-6 transition-all duration-300 hover:bg-zinc-900/50 hover:shadow-xl ${colors.glow}`}
            >
              <div className={`mb-4 flex items-center gap-2 ${colors.accent}`}>
                {icon}
                <h3 className="text-base font-semibold">{category.label}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.1 + skillIndex * 0.03 }}
                    className="rounded-full bg-zinc-800/80 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-zinc-700 hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </EpochSection>
  );
}
