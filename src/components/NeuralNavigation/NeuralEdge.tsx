'use client';

import { motion } from 'framer-motion';

interface NeuralEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isActive: boolean;
  isHovered: boolean;
  reducedMotion?: boolean;
}

export default function NeuralEdge({
  x1,
  y1,
  x2,
  y2,
  isActive,
  isHovered,
  reducedMotion = false,
}: NeuralEdgeProps) {
  const pathLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return (
    <g>
      {/* Base edge line */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isActive || isHovered ? '#22d3ee' : '#3f3f46'}
        strokeWidth={isActive || isHovered ? 2 : 1}
        strokeLinecap="round"
        initial={reducedMotion ? {} : { pathLength: 0 }}
        animate={reducedMotion ? {} : { pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Flowing animation overlay */}
      {(isActive || isHovered) && !reducedMotion && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#22d3ee"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={`${pathLength * 0.2} ${pathLength * 0.8}`}
          initial={{ strokeDashoffset: pathLength }}
          animate={{ strokeDashoffset: -pathLength }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ opacity: 0.6 }}
        />
      )}

      {/* Glow effect */}
      {(isActive || isHovered) && !reducedMotion && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#22d3ee"
          strokeWidth={4}
          strokeLinecap="round"
          style={{ filter: 'blur(4px)', opacity: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        />
      )}
    </g>
  );
}
