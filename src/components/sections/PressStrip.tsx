'use client';

import { motion } from 'framer-motion';
import { pressFeatures } from '@/lib/data';

export default function PressStrip() {
  if (!pressFeatures || pressFeatures.length === 0) return null;

  return (
    <section
      id="press"
      className="relative z-10 border-y border-zinc-800/50 bg-zinc-950/40 px-6 py-10 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:gap-8"
      >
        <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Featured In
        </span>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-6">
          {pressFeatures.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 rounded-lg border border-transparent px-3 py-2 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60 md:flex-row md:items-center md:gap-4"
            >
              <span className="text-base font-bold tracking-tight text-white md:text-lg">
                {item.outlet}
              </span>
              <span className="hidden text-slate-700 md:inline">·</span>
              <span className="text-sm text-slate-400 transition-colors group-hover:text-slate-200">
                {item.title}
              </span>
              <span className="text-xs text-slate-600">{item.date}</span>
              <svg
                className="ml-auto hidden h-4 w-4 text-slate-600 transition-colors group-hover:text-slate-300 md:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
