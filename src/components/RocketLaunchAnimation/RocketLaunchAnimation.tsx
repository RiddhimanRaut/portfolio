'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import ParticleField from '@/components/ParticleField';

export default function RocketLaunchAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Video scrubs during the middle portion of scroll
  const videoProgress = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // Overlay opacity
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.1, 0.23, 0.26, 0.4, 0.45],
    [0.75, 0.6, 0.3, 0.3, 0.75, 0.95, 1]
  );

  // Particle field fades in as overlay reaches 100%
  const particleOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    [0, 1]
  );

  // Direct video scrubbing - no throttling for zero lag
  useMotionValueEvent(videoProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !isLoaded || duration === 0) return;

    const clampedProgress = Math.max(0, Math.min(1, latest));
    const targetTime = clampedProgress * duration;
    video.currentTime = targetTime;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className="relative">
        <div className="fixed inset-0 z-0 bg-zinc-950" />
        <ParticleField />
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed fullscreen video background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 min-h-[100vw] min-w-[100vh] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover"
          style={{ willChange: 'contents' }}
          playsInline
          muted
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/rocket.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-zinc-950"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Particle field with connected dots */}
      <motion.div
        className="fixed inset-0 z-[1]"
        style={{ opacity: particleOpacity }}
      >
        <ParticleField />
      </motion.div>

      {/* Scrollable content */}
      {children}
    </div>
  );
}
