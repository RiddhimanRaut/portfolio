'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { aboutContent } from '@/lib/data';

export default function About() {
  return (
    <Section id="about">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">About</h2>

      <div className="space-y-6">
        {aboutContent.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-slate-400">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {aboutContent.highlights.map((highlight, index) => (
          <motion.div
            key={highlight.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-zinc-700"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-300 transition-colors group-hover:text-white">
              {highlight.label}
            </h3>
            <p className="text-sm text-slate-500">{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
