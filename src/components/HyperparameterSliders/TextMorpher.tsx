'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AboutTextVariants, getAboutText } from '@/lib/aboutVariants';

interface TextMorpherProps {
  variants: AboutTextVariants;
  verbosity: number;
  technicalLevel: number;
  className?: string;
  reducedMotion?: boolean;
}

export default function TextMorpher({
  variants,
  verbosity,
  technicalLevel,
  className = '',
  reducedMotion = false,
}: TextMorpherProps) {
  const targetText = useMemo(
    () => getAboutText(variants, verbosity, technicalLevel),
    [variants, verbosity, technicalLevel]
  );

  const [displayedText, setDisplayedText] = useState(targetText);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (targetText !== displayedText) {
      if (reducedMotion) {
        setDisplayedText(targetText);
        return;
      }

      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setDisplayedText(targetText);
        setIsTransitioning(false);
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [targetText, displayedText, reducedMotion]);

  if (reducedMotion) {
    return <p className={className}>{displayedText}</p>;
  }

  return (
    <motion.p
      className={`text-morph ${className}`}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.08 }}
    >
      {displayedText}
    </motion.p>
  );
}

interface HighlightMorpherProps {
  variants: {
    conciseCasual: string;
    conciseTechnical: string;
    detailedCasual: string;
    detailedTechnical: string;
  };
  verbosity: number;
  technicalLevel: number;
  className?: string;
  reducedMotion?: boolean;
}

export function HighlightMorpher({
  variants,
  verbosity,
  technicalLevel,
  className = '',
  reducedMotion = false,
}: HighlightMorpherProps) {
  const targetText = useMemo(() => {
    const isVerbose = verbosity >= 0.5;
    const isTechnical = technicalLevel >= 0.5;

    if (!isVerbose && !isTechnical) return variants.conciseCasual;
    if (!isVerbose && isTechnical) return variants.conciseTechnical;
    if (isVerbose && !isTechnical) return variants.detailedCasual;
    return variants.detailedTechnical;
  }, [variants, verbosity, technicalLevel]);

  const [displayedText, setDisplayedText] = useState(targetText);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (targetText !== displayedText) {
      if (reducedMotion) {
        setDisplayedText(targetText);
        return;
      }

      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setDisplayedText(targetText);
        setIsTransitioning(false);
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [targetText, displayedText, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{displayedText}</span>;
  }

  return (
    <motion.span
      className={`text-morph inline ${className}`}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 0.08 }}
    >
      {displayedText}
    </motion.span>
  );
}
