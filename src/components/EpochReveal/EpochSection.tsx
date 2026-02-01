'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useAITheme, useReducedMotion } from '@/context/AIThemeContext';
import EpochLoader from './EpochLoader';

interface EpochSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function EpochSection({ id, children, className = '' }: EpochSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: true });
  const {
    isSectionComplete,
    markSectionComplete,
    getEpochNumber,
    getTotalEpochs,
    currentLoadingSection,
    setCurrentLoadingSection,
  } = useAITheme();
  const reducedMotion = useReducedMotion();

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const hasTriggered = useRef(false);

  const sectionName = id.charAt(0).toUpperCase() + id.slice(1);
  const epochNumber = getEpochNumber(id);
  const totalEpochs = getTotalEpochs();
  const isComplete = isSectionComplete(id);

  useEffect(() => {
    if (isInView && !isComplete && !hasTriggered.current && !currentLoadingSection) {
      hasTriggered.current = true;

      if (reducedMotion) {
        markSectionComplete(id);
        setHasLoaded(true);
        return;
      }

      setIsLoading(true);
      setCurrentLoadingSection(id);
    }
  }, [isInView, isComplete, currentLoadingSection, id, reducedMotion, markSectionComplete, setCurrentLoadingSection]);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setHasLoaded(true);
    markSectionComplete(id);
    setCurrentLoadingSection(null);
  }, [id, markSectionComplete, setCurrentLoadingSection]);

  const shouldShowContent = isComplete || hasLoaded || reducedMotion;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative z-10 px-6 py-24 md:py-32 ${className}`}
    >
      <EpochLoader
        isLoading={isLoading}
        epochNumber={epochNumber}
        totalEpochs={totalEpochs}
        sectionName={sectionName}
        onComplete={handleLoadComplete}
        reducedMotion={reducedMotion}
      />

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, scale: 0.98 }}
        animate={
          shouldShowContent
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.98 }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="mx-auto max-w-5xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
