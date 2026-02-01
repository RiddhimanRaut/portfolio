import { useState, useEffect, useMemo } from 'react';

interface TextVariant {
  verbosity: {
    low: string;
    high: string;
  };
  technical: {
    low: string;
    high: string;
  };
}

interface UseTextMorphOptions {
  variants: TextVariant;
  verbosity: number;
  technicalLevel: number;
  transitionDuration?: number;
}

export function useTextMorph({
  variants,
  verbosity,
  technicalLevel,
  transitionDuration = 300,
}: UseTextMorphOptions) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const targetText = useMemo(() => {
    const verbosityText = verbosity < 0.5 ? variants.verbosity.low : variants.verbosity.high;
    const technicalText = technicalLevel < 0.5 ? variants.technical.low : variants.technical.high;

    if (verbosity < 0.5 && technicalLevel < 0.5) {
      return variants.verbosity.low;
    } else if (verbosity >= 0.5 && technicalLevel < 0.5) {
      return variants.verbosity.high;
    } else if (verbosity < 0.5 && technicalLevel >= 0.5) {
      return blendTexts(variants.verbosity.low, variants.technical.high);
    } else {
      return blendTexts(variants.verbosity.high, variants.technical.high);
    }
  }, [variants, verbosity, technicalLevel]);

  useEffect(() => {
    if (displayedText === '') {
      setDisplayedText(targetText);
      return;
    }

    if (displayedText !== targetText) {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setDisplayedText(targetText);
        setIsTransitioning(false);
      }, transitionDuration / 2);

      return () => clearTimeout(timeout);
    }
  }, [targetText, displayedText, transitionDuration]);

  return { displayedText, isTransitioning };
}

function blendTexts(base: string, technical: string): string {
  return technical;
}

interface TextVariants {
  conciseCasual: string;
  conciseTechnical: string;
  detailedCasual: string;
  detailedTechnical: string;
}

export function interpolateText(
  variants: TextVariants,
  verbosity: number,
  technicalLevel: number
): string {
  if (verbosity < 0.5 && technicalLevel < 0.5) {
    return variants.conciseCasual;
  } else if (verbosity >= 0.5 && technicalLevel < 0.5) {
    return variants.detailedCasual;
  } else if (verbosity < 0.5 && technicalLevel >= 0.5) {
    return variants.conciseTechnical;
  } else {
    return variants.detailedTechnical;
  }
}

export function useInterpolatedText(
  variants: TextVariants,
  verbosity: number,
  technicalLevel: number
) {
  const [opacity, setOpacity] = useState(1);
  const [currentText, setCurrentText] = useState(() =>
    interpolateText(variants, verbosity, technicalLevel)
  );

  const targetText = useMemo(
    () => interpolateText(variants, verbosity, technicalLevel),
    [variants, verbosity, technicalLevel]
  );

  useEffect(() => {
    if (currentText !== targetText) {
      setOpacity(0);
      const timeout = setTimeout(() => {
        setCurrentText(targetText);
        setOpacity(1);
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [targetText, currentText]);

  return { text: currentText, opacity };
}
