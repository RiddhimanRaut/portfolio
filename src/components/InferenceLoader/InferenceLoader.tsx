'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAITheme, useReducedMotion } from '@/context/AIThemeContext';
import ModelMetrics, { LayerProgress } from './ModelMetrics';
import TypewriterText from './TypewriterText';

interface InferenceLoaderProps {
  className?: string;
}

export default function InferenceLoader({ className = '' }: InferenceLoaderProps) {
  const { isInferring, inferenceTarget, stopInference } = useAITheme();
  const reducedMotion = useReducedMotion();
  const [currentLayer, setCurrentLayer] = useState(0);
  const [statusText, setStatusText] = useState('Running inference...');

  const totalLayers = 12;

  useEffect(() => {
    if (!isInferring) {
      setCurrentLayer(0);
      setStatusText('Running inference...');
      return;
    }

    if (reducedMotion) {
      setTimeout(stopInference, 100);
      return;
    }

    const layerInterval = setInterval(() => {
      setCurrentLayer((prev) => {
        if (prev >= totalLayers) {
          clearInterval(layerInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 40);

    const timeout = setTimeout(() => {
      stopInference();
    }, 600);

    return () => {
      clearInterval(layerInterval);
      clearTimeout(timeout);
    };
  }, [isInferring, stopInference, reducedMotion]);

  if (reducedMotion && !isInferring) return null;

  return (
    <AnimatePresence>
      {isInferring && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`inference-overlay fixed inset-0 z-[100] flex items-center justify-center ${className}`}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm px-6"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/95 p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                <TypewriterText
                  text={statusText}
                  speed={20}
                  className="text-sm text-cyan-400"
                  showCursor={true}
                />
              </div>

              <ModelMetrics isActive={isInferring} className="mb-4" />

              <LayerProgress currentLayer={currentLayer} totalLayers={totalLayers} />

              {inferenceTarget && (
                <div className="mt-4 border-t border-zinc-800 pt-3">
                  <p className="font-mono text-[10px] text-zinc-600">
                    Target: <span className="text-zinc-400">{inferenceTarget}</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
