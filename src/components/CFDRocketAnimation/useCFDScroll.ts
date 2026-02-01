'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface CFDScrollValues {
  scrollYProgress: MotionValue<number>;
  particleOpacity: MotionValue<number>;
  videoOpacity: MotionValue<number>;
  videoProgress: MotionValue<number>;
  overlayOpacity: MotionValue<number>;
}

interface UseCFDScrollOptions {
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

export function useCFDScroll(options: UseCFDScrollOptions = {}): CFDScrollValues {
  const { scrollContainer } = options;

  const { scrollYProgress } = useScroll({
    target: scrollContainer,
    offset: ['start start', 'end end'],
  });

  // Particle opacity: 1 at 0%, fades from 0.1 to 0.2, gone by 0.2
  const particleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  // Video opacity: hidden at 0%, fades in 0.1 to 0.2, full opacity after
  const videoOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Video progress: starts at 0.2, ends at 0.7 (maps to 0-1 for video currentTime)
  const videoProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  // Gradient overlay for content readability: subtle at start, stronger during video
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], [0, 0.4, 0.4, 0]);

  return {
    scrollYProgress,
    particleOpacity,
    videoOpacity,
    videoProgress,
    overlayOpacity,
  };
}

export default useCFDScroll;
