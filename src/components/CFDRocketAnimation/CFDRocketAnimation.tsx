'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParticleField from '@/components/ParticleField';
import VideoScrubber from './VideoScrubber';
import { useCFDScroll } from './useCFDScroll';

interface CFDRocketAnimationProps {
  children: React.ReactNode;
  videoSrc?: string;
  videoPoster?: string;
  videoFallbackSrc?: string;
}

export default function CFDRocketAnimation({
  children,
  videoSrc = '/videos/cfd-rocket.mp4',
  videoPoster = '/videos/cfd-rocket-poster.png',
  videoFallbackSrc,
}: CFDRocketAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { particleOpacity, videoOpacity, videoProgress, overlayOpacity } = useCFDScroll({
    scrollContainer: containerRef,
  });

  // Reduced motion fallback: show static background instead of video
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className="relative">
        {/* Static background for reduced motion */}
        <div className="fixed inset-0 z-0 bg-slate-950" aria-hidden="true">
          {/* Optional: static poster image */}
          {videoPoster && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${videoPoster})` }}
            />
          )}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background layer */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        {/* Particle field with scroll-controlled opacity */}
        <ParticleField opacity={particleOpacity} />

        {/* Video scrubber */}
        <VideoScrubber
          progress={videoProgress}
          opacity={videoOpacity}
          src={videoSrc}
          poster={videoPoster}
          fallbackSrc={videoFallbackSrc}
        />

        {/* Gradient overlay for content readability */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/60"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Scrollable content */}
      {children}
    </div>
  );
}
