'use client';

import { motion } from 'framer-motion';
import { useAITheme, useReducedMotion } from '@/context/AIThemeContext';
import Slider from './Slider';

interface HyperparameterSlidersProps {
  className?: string;
}

export default function HyperparameterSliders({ className = '' }: HyperparameterSlidersProps) {
  const { verbosity, technicalLevel, setVerbosity, setTechnicalLevel, resetSliders } = useAITheme();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-wider text-cyan-400">
          Hyperparameters
        </h3>
        <button
          onClick={resetSliders}
          className="rounded px-2 py-1 font-mono text-[10px] text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          aria-label="Reset sliders to default values"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <Slider
          label="Verbosity"
          value={verbosity}
          onChange={setVerbosity}
          leftLabel="Concise"
          rightLabel="Detailed"
        />

        <Slider
          label="Technical Level"
          value={technicalLevel}
          onChange={setTechnicalLevel}
          leftLabel="Casual"
          rightLabel="Expert"
        />
      </div>

      <div className="mt-4 border-t border-zinc-800 pt-3">
        <p className="font-mono text-[10px] text-zinc-600">
          Adjust to morph text output
        </p>
      </div>
    </motion.div>
  );
}
