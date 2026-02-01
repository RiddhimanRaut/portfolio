'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
  showCursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  enabled = true,
  showCursor = true,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const { displayedText, isTyping, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    enabled,
    onComplete,
  });

  return (
    <span className={`font-mono ${className}`} aria-live="polite" aria-label={text}>
      {displayedText}
      {showCursor && (isTyping || !isComplete) && (
        <span className="terminal-cursor">_</span>
      )}
    </span>
  );
}
