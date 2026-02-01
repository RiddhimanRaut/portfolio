'use client';

import { ReactNode } from 'react';

interface TerminalTextProps {
  children: ReactNode;
  className?: string;
  prefix?: string;
  animate?: boolean;
}

export default function TerminalText({
  children,
  className = '',
  prefix = '>',
  animate = false,
}: TerminalTextProps) {
  return (
    <span className={`terminal-text ${className}`}>
      {prefix && <span className="terminal-prefix">{prefix} </span>}
      <span className={animate ? 'terminal-typing' : ''}>{children}</span>
    </span>
  );
}

interface BlinkingCursorProps {
  className?: string;
}

export function BlinkingCursor({ className = '' }: BlinkingCursorProps) {
  return <span className={`terminal-cursor ${className}`}>_</span>;
}

interface TerminalLineProps {
  children: ReactNode;
  prefix?: string;
  className?: string;
}

export function TerminalLine({ children, prefix = '>', className = '' }: TerminalLineProps) {
  return (
    <div className={`terminal-line ${className}`}>
      <span className="terminal-prefix text-cyan-400">{prefix}</span>
      <span className="ml-2">{children}</span>
    </div>
  );
}
