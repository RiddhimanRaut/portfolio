'use client';

import { useId, useMemo } from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export default function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  leftLabel,
  rightLabel,
  className = '',
}: SliderProps) {
  const id = useId();

  const progress = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const valueText = useMemo(() => {
    if (leftLabel && rightLabel) {
      return value < 0.5 ? leftLabel : rightLabel;
    }
    return `${Math.round(value * 100)}%`;
  }, [value, leftLabel, rightLabel]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-mono text-xs uppercase tracking-wider text-zinc-400">
          {label}
        </label>
        <span className="font-mono text-xs text-cyan-400">{(value * 100).toFixed(0)}%</span>
      </div>

      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="ai-slider w-full"
          style={{ '--slider-progress': `${progress}%` } as React.CSSProperties}
          aria-label={label}
          aria-valuetext={valueText}
        />
      </div>

      {(leftLabel || rightLabel) && (
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-zinc-600">{leftLabel}</span>
          <span className="font-mono text-[10px] text-zinc-600">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
