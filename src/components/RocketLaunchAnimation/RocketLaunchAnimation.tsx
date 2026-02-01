'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import SpaceBackground from '@/components/SpaceBackground';

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
  // 0-10%: Hold first frame (Hero visible)
  // 10-25%: Video plays (rocket animation)
  // 25-100%: Hold last frame (content visible)
  const videoProgress = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  // Overlay opacity: darker at start and end for readability, lighter during animation
  // Goes to 100% after About to transition to particles
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

  // Throttled video scrubbing for performance
  const lastUpdateRef = useRef(0);

  useMotionValueEvent(videoProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !isLoaded || duration === 0) return;

    // Throttle updates to ~30fps
    const now = performance.now();
    if (now - lastUpdateRef.current < 33) return;
    lastUpdateRef.current = now;

    const clampedProgress = Math.max(0, Math.min(1, latest));
    const targetTime = clampedProgress * duration;

    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
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
        <div className="fixed inset-0 z-0 bg-slate-950" />
        <SpaceBackground />
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

        {/* Dark overlay for text readability - fades to 100% for particle transition */}
        <motion.div
          className="absolute inset-0 bg-slate-950"
          style={{
            opacity: overlayOpacity,
          }}
        />
      </div>

      {/* Particle field fades in after video section */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ opacity: particleOpacity }}
      >
        <SpaceBackground />
      </motion.div>

      {/* Scrollable content */}
      {children}
    </div>
  );
}
