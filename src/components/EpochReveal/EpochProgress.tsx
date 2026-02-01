'use client';

import { motion } from 'framer-motion';

interface EpochProgressProps {
  progress: number;
  className?: string;
}

export default function EpochProgress({ progress, className = '' }: EpochProgressProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`epoch-progress-track w-full ${className}`} role="progressbar" aria-valuenow={clampedProgress} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="epoch-progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.05, ease: 'linear' }}
      />
    </div>
  );
}

interface EpochProgressWithLabelProps {
  progress: number;
  epochNumber: number;
  totalEpochs: number;
  sectionName: string;
  className?: string;
}

export function EpochProgressWithLabel({
  progress,
  epochNumber,
  totalEpochs,
  sectionName,
  className = '',
}: EpochProgressWithLabelProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between font-mono text-sm">
        <span className="text-cyan-400">
          Epoch {epochNumber}/{totalEpochs} - Loading {sectionName}...
        </span>
        <span className="text-zinc-500">{Math.round(progress)}%</span>
      </div>
      <EpochProgress progress={progress} />
    </div>
  );
}
