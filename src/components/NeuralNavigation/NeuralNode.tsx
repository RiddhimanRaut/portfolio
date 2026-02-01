'use client';

import { motion } from 'framer-motion';

interface NeuralNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  isActive: boolean;
  isHovered: boolean;
  isConnectedToHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  reducedMotion?: boolean;
}

export default function NeuralNode({
  id,
  label,
  x,
  y,
  isActive,
  isHovered,
  isConnectedToHovered,
  onClick,
  onHover,
  reducedMotion = false,
}: NeuralNodeProps) {
  const nodeSize = 40;
  const innerSize = 32;

  return (
    <motion.g
      initial={reducedMotion ? {} : { opacity: 0, scale: 0 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      role="button"
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Navigate to ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Outer glow ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={nodeSize / 2}
        fill="transparent"
        stroke={isActive || isHovered ? '#22d3ee' : '#3f3f46'}
        strokeWidth={2}
        animate={
          reducedMotion
            ? {}
            : {
                strokeOpacity: isActive ? [0.5, 1, 0.5] : 1,
                r: isActive ? [nodeSize / 2, nodeSize / 2 + 2, nodeSize / 2] : nodeSize / 2,
              }
        }
        transition={
          reducedMotion
            ? {}
            : {
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: 'easeInOut',
              }
        }
      />

      {/* Glow effect */}
      {(isActive || isHovered) && !reducedMotion && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeSize / 2 + 8}
          fill="transparent"
          stroke="#22d3ee"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ filter: 'blur(4px)' }}
        />
      )}

      {/* Inner circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={innerSize / 2}
        fill={isActive ? '#22d3ee' : isHovered ? 'rgba(34, 211, 238, 0.2)' : '#18181b'}
        stroke={isActive || isHovered || isConnectedToHovered ? '#22d3ee' : '#52525b'}
        strokeWidth={1.5}
        animate={
          reducedMotion
            ? {}
            : {
                scale: isHovered && !isActive ? 1.1 : 1,
              }
        }
        transition={{ duration: 0.2 }}
      />

      {/* Node label */}
      <text
        x={x}
        y={y + nodeSize / 2 + 16}
        textAnchor="middle"
        fill={isActive || isHovered ? '#22d3ee' : '#a1a1aa'}
        fontSize={10}
        fontFamily="var(--font-mono)"
        style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
      >
        {label}
      </text>
    </motion.g>
  );
}
