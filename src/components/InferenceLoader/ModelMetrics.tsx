'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: number;
  unit: string;
  targetValue: number;
  decimals?: number;
}

interface ModelMetricsProps {
  isActive: boolean;
  className?: string;
}

const METRICS: Metric[] = [
  { label: 'Weights', value: 0, targetValue: 127.4, unit: 'M', decimals: 1 },
  { label: 'FLOPs', value: 0, targetValue: 2.3, unit: 'G', decimals: 1 },
  { label: 'Latency', value: 0, targetValue: 42, unit: 'ms', decimals: 0 },
  { label: 'Memory', value: 0, targetValue: 512, unit: 'MB', decimals: 0 },
];

export default function ModelMetrics({ isActive, className = '' }: ModelMetricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>(METRICS);

  useEffect(() => {
    if (!isActive) {
      setMetrics(METRICS);
      return;
    }

    const duration = 400;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      const eased = easeOutCubic(progress);

      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.targetValue * eased,
        }))
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="inference-metric"
        >
          <span className="text-zinc-500">{metric.label}: </span>
          <span className="value">
            {metric.decimals !== undefined
              ? metric.value.toFixed(metric.decimals)
              : Math.round(metric.value)}
            {metric.unit}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

interface LayerProgressProps {
  currentLayer: number;
  totalLayers: number;
  className?: string;
}

export function LayerProgress({ currentLayer, totalLayers, className = '' }: LayerProgressProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
        <span>Layer Progress</span>
        <span className="text-cyan-400">
          {currentLayer}/{totalLayers}
        </span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: totalLayers }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-sm transition-colors ${
              index < currentLayer ? 'bg-cyan-400' : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
