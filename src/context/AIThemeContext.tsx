'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useMemo } from 'react';

interface AIThemeState {
  completedSections: Set<string>;
  currentLoadingSection: string | null;
  verbosity: number;
  technicalLevel: number;
  isInferring: boolean;
  inferenceTarget: string | null;
  activeSection: string;
  hoveredNode: string | null;
}

interface AIThemeContextValue extends AIThemeState {
  markSectionComplete: (sectionId: string) => void;
  setCurrentLoadingSection: (sectionId: string | null) => void;
  setVerbosity: (value: number) => void;
  setTechnicalLevel: (value: number) => void;
  startInference: (target: string) => void;
  stopInference: () => void;
  setActiveSection: (sectionId: string) => void;
  setHoveredNode: (nodeId: string | null) => void;
  resetSliders: () => void;
  isSectionComplete: (sectionId: string) => boolean;
  getEpochNumber: (sectionId: string) => number;
  getTotalEpochs: () => number;
}

const AIThemeContext = createContext<AIThemeContextValue | null>(null);

const SECTION_ORDER = ['about', 'experience', 'projects', 'skills', 'contact'];
const DEFAULT_VERBOSITY = 0.5;
const DEFAULT_TECHNICAL_LEVEL = 0.5;

export function AIThemeProvider({ children }: { children: ReactNode }) {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [currentLoadingSection, setCurrentLoadingSection] = useState<string | null>(null);
  const [verbosity, setVerbosityState] = useState(DEFAULT_VERBOSITY);
  const [technicalLevel, setTechnicalLevelState] = useState(DEFAULT_TECHNICAL_LEVEL);
  const [isInferring, setIsInferring] = useState(false);
  const [inferenceTarget, setInferenceTarget] = useState<string | null>(null);
  const [activeSection, setActiveSectionState] = useState('');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const markSectionComplete = useCallback((sectionId: string) => {
    setCompletedSections((prev) => new Set([...prev, sectionId]));
  }, []);

  const setVerbosity = useCallback((value: number) => {
    setVerbosityState(Math.max(0, Math.min(1, value)));
  }, []);

  const setTechnicalLevel = useCallback((value: number) => {
    setTechnicalLevelState(Math.max(0, Math.min(1, value)));
  }, []);

  const startInference = useCallback((target: string) => {
    setIsInferring(true);
    setInferenceTarget(target);
  }, []);

  const stopInference = useCallback(() => {
    setIsInferring(false);
    setInferenceTarget(null);
  }, []);

  const setActiveSection = useCallback((sectionId: string) => {
    setActiveSectionState(sectionId);
  }, []);

  const resetSliders = useCallback(() => {
    setVerbosityState(DEFAULT_VERBOSITY);
    setTechnicalLevelState(DEFAULT_TECHNICAL_LEVEL);
  }, []);

  const isSectionComplete = useCallback(
    (sectionId: string) => completedSections.has(sectionId),
    [completedSections]
  );

  const getEpochNumber = useCallback((sectionId: string) => {
    const index = SECTION_ORDER.indexOf(sectionId.toLowerCase());
    return index >= 0 ? index + 1 : 1;
  }, []);

  const getTotalEpochs = useCallback(() => SECTION_ORDER.length, []);

  const value = useMemo(
    (): AIThemeContextValue => ({
      completedSections,
      currentLoadingSection,
      verbosity,
      technicalLevel,
      isInferring,
      inferenceTarget,
      activeSection,
      hoveredNode,
      markSectionComplete,
      setCurrentLoadingSection,
      setVerbosity,
      setTechnicalLevel,
      startInference,
      stopInference,
      setActiveSection,
      setHoveredNode,
      resetSliders,
      isSectionComplete,
      getEpochNumber,
      getTotalEpochs,
    }),
    [
      completedSections,
      currentLoadingSection,
      verbosity,
      technicalLevel,
      isInferring,
      inferenceTarget,
      activeSection,
      hoveredNode,
      markSectionComplete,
      setVerbosity,
      setTechnicalLevel,
      startInference,
      stopInference,
      setActiveSection,
      resetSliders,
      isSectionComplete,
      getEpochNumber,
      getTotalEpochs,
    ]
  );

  return <AIThemeContext.Provider value={value}>{children}</AIThemeContext.Provider>;
}

export function useAITheme() {
  const context = useContext(AIThemeContext);
  if (!context) {
    throw new Error('useAITheme must be used within an AIThemeProvider');
  }
  return context;
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}
