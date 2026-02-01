'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { HyperparameterSliders, TextMorpher, HighlightMorpher } from '@/components/HyperparameterSliders';
import { useAITheme, useReducedMotion } from '@/context/AIThemeContext';
import {
  aboutParagraph1Variants,
  aboutParagraph2Variants,
  aboutHighlightVariants,
} from '@/lib/aboutVariants';

export default function About() {
  const { verbosity, technicalLevel } = useAITheme();
  const reducedMotion = useReducedMotion();

  return (
    <Section id="about">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">About</h2>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <TextMorpher
            variants={aboutParagraph1Variants}
            verbosity={verbosity}
            technicalLevel={technicalLevel}
            className="text-lg leading-relaxed text-slate-400"
            reducedMotion={reducedMotion}
          />
          <TextMorpher
            variants={aboutParagraph2Variants}
            verbosity={verbosity}
            technicalLevel={technicalLevel}
            className="text-lg leading-relaxed text-slate-400"
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <HyperparameterSliders />
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {(['physicsAI', 'sciml', 'gnns'] as const).map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-zinc-700"
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-300 transition-colors group-hover:text-white">
              {key === 'physicsAI' ? 'Physics AI' : key === 'sciml' ? 'SciML' : 'GNNs'}
            </h3>
            <p className="text-sm text-slate-500">
              <HighlightMorpher
                variants={aboutHighlightVariants[key]}
                verbosity={verbosity}
                technicalLevel={technicalLevel}
                reducedMotion={reducedMotion}
              />
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
