'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useMotionValueEvent } from 'framer-motion';

interface VideoScrubberProps {
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  src: string;
  poster?: string;
  fallbackSrc?: string;
}

export default function VideoScrubber({
  progress,
  opacity,
  src,
  poster,
  fallbackSrc,
}: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoaded(true);
      setHasError(false);
      // Pause the video - we control playback via scrubbing
      video.pause();
    };

    const handleCanPlay = () => {
      // Ensure we're paused and ready
      video.pause();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Preload the video
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src]);

  // Update video currentTime based on scroll progress
  useMotionValueEvent(progress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError || duration === 0) return;

    // Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, latest));
    const targetTime = clampedProgress * duration;

    // Use requestAnimationFrame for smooth scrubbing
    requestAnimationFrame(() => {
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      }
    });
  });

  // If there's an error, show poster image as fallback
  if (hasError && poster) {
    return (
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity }}
        aria-hidden="true"
        role="presentation"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
      aria-hidden="true"
      role="presentation"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
        preload="auto"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="video/webm" />}
      </video>

      {/* Loading state overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-slate-400" />
        </div>
      )}
    </motion.div>
  );
}
