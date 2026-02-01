'use client';

import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-zinc-700 hover:text-white"
    >
      {skill}
    </motion.span>
  );
}
