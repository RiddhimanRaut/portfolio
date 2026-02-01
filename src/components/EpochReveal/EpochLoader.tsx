'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EpochProgressWithLabel } from './EpochProgress';

interface EpochLoaderProps {
  isLoading: boolean;
  epochNumber: number;
  totalEpochs: number;
  sectionName: string;
  onComplete: () => void;
  reducedMotion?: boolean;
}

const STATUS_MESSAGES = [
  '> Initializing weights...',
  '> Loading parameters...',
  '> Running forward pass...',
];

export default function EpochLoader({
  isLoading,
  epochNumber,
  totalEpochs,
  sectionName,
  onComplete,
  reducedMotion = false,
}: EpochLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setStatusIndex(0);
      return;
    }

    if (reducedMotion) {
      setProgress(100);
      onComplete();
      return;
    }

    // Fast progress bar - 250ms total
    const duration = 250;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = Math.min(100, (step / steps) * 100);
      setProgress(newProgress);

      // Update status message at 33% and 66%
      if (newProgress > 33 && statusIndex === 0) setStatusIndex(1);
      if (newProgress > 66 && statusIndex === 1) setStatusIndex(2);

      if (newProgress >= 100) {
        clearInterval(timer);
        onComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading, onComplete, reducedMotion, statusIndex]);

  if (reducedMotion && !isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm"
        >
          <div className="w-full max-w-md px-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl">
              <EpochProgressWithLabel
                progress={progress}
                epochNumber={epochNumber}
                totalEpochs={totalEpochs}
                sectionName={sectionName}
              />

              <div className="mt-4 space-y-1">
                {STATUS_MESSAGES.slice(0, statusIndex + 1).map((line, index) => (
                  <div key={index} className="font-mono text-xs text-zinc-500">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
