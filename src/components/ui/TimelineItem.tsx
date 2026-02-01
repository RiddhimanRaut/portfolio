'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  description: string[];
  logo?: string;
  index: number;
}

export default function TimelineItem({
  company,
  role,
  period,
  location,
  current,
  description,
  logo,
  index,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute top-0 left-0 flex h-full flex-col items-center">
        <div
          className={`h-3 w-3 rounded-full border-2 ${
            current
              ? 'border-slate-400 bg-slate-400'
              : 'border-zinc-600 bg-zinc-900'
          }`}
        />
        <div className="h-full w-px bg-zinc-800" />
      </div>

      <div className="group">
        <div className="mb-3 flex items-center gap-4">
          {logo && (
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/10 p-1.5">
              <Image
                src={logo}
                alt={`${company} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-white">{company}</h3>
              {current && (
                <span className="rounded-full bg-slate-500/20 px-2 py-0.5 text-xs text-slate-400">
                  Current
                </span>
              )}
            </div>
            <p className="text-slate-300">{role}</p>
          </div>
        </div>

        <p className="mb-4 text-sm text-slate-500">
          {period} &middot; {location}
        </p>

        <ul className="space-y-2">
          {description.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-400">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
