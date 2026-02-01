'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import ParticleField from '@/components/ParticleField';

export default function RocketLaunchAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
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
    [0, 0.08, 0.1, 0.23, 0.26, 0.35],
    [0.75, 0.6, 0.3, 0.3, 0.9, 1]
  );

  // Particle field fades in
  const particleOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    [0, 1]
  );

  // Lazy load particles
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.25 && !showParticles) {
      setShowParticles(true);
    }
  });

  // Video scrubbing - only when in range
  useMotionValueEvent(videoProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !isLoaded || duration === 0) return;

    if (latest <= 0 || latest >= 1) return;

    const targetTime = latest * duration;
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
      {showParticles && (
        <motion.div
          className="fixed inset-0 z-[1]"
          style={{ opacity: particleOpacity }}
        >
          <ParticleField />
        </motion.div>
      )}

      {/* Scrollable content */}
      {children}
    </div>
  );
}
