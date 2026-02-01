import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypewriter({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  enabled = true,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const reset = useCallback(() => {
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    reset();

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete, enabled, reset]);

  return { displayedText, isTyping, isComplete, reset };
}

interface UseTypewriterSequenceOptions {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  onLineComplete?: (index: number) => void;
  onAllComplete?: () => void;
  enabled?: boolean;
}

export function useTypewriterSequence({
  lines,
  speed = 30,
  lineDelay = 200,
  onLineComplete,
  onAllComplete,
  enabled = true,
}: UseTypewriterSequenceOptions) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled || lines.length === 0) {
      setDisplayedLines(lines);
      setIsComplete(true);
      return;
    }

    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentText('');
    setIsComplete(false);
    setIsTyping(true);

    let currentLine = 0;
    let charIndex = 0;
    let lineTimeout: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentLine >= lines.length) {
        setIsTyping(false);
        setIsComplete(true);
        onAllComplete?.();
        return;
      }

      const line = lines[currentLine];
      if (charIndex < line.length) {
        charIndex++;
        setCurrentText(line.slice(0, charIndex));
      } else {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentText('');
        onLineComplete?.(currentLine);
        currentLine++;
        setCurrentLineIndex(currentLine);
        charIndex = 0;

        if (currentLine < lines.length) {
          lineTimeout = setTimeout(typeNextChar, lineDelay);
          return;
        } else {
          setIsTyping(false);
          setIsComplete(true);
          onAllComplete?.();
          return;
        }
      }

      lineTimeout = setTimeout(typeNextChar, speed);
    };

    lineTimeout = setTimeout(typeNextChar, speed);

    return () => clearTimeout(lineTimeout);
  }, [lines, speed, lineDelay, onLineComplete, onAllComplete, enabled]);

  return {
    displayedLines,
    currentLineIndex,
    currentText,
    isTyping,
    isComplete,
  };
}
