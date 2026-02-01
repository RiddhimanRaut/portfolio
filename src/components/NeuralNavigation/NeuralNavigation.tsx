'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/data';
import { useAITheme, useReducedMotion } from '@/context/AIThemeContext';
import { useNeuralLayout, getHorizontalPositions, EdgeConnection } from './useNeuralLayout';
import NeuralNode from './NeuralNode';
import NeuralEdge from './NeuralEdge';

export default function NeuralNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { activeSection, setActiveSection, hoveredNode, setHoveredNode, startInference } =
    useAITheme();
  const reducedMotion = useReducedMotion();

  const width = isMobile ? 320 : 500;
  const height = isMobile ? 70 : 120;
  const nodeRadius = isMobile ? 16 : 20;

  const { nodePositions, edges } = useNeuralLayout({
    nodes: navItems,
    width,
    height,
    nodeRadius,
  });

  const horizontalPositions = getHorizontalPositions(navItems, width, nodeRadius);
  const positions = isMobile ? horizontalPositions : nodePositions;

  const horizontalEdges: EdgeConnection[] = isMobile
    ? horizontalPositions.slice(0, -1).map((pos, i) => {
        const next = horizontalPositions[i + 1];
        return {
          from: pos.id,
          to: next.id,
          x1: pos.x + nodeRadius,
          y1: pos.y,
          x2: next.x - nodeRadius,
          y2: next.y,
        };
      })
    : edges;

  const currentEdges = isMobile ? horizontalEdges : edges;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNodeClick = useCallback(
    (href: string) => {
      const sectionId = href.slice(1);
      startInference(sectionId);

      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }, reducedMotion ? 0 : 400);
    },
    [startInference, reducedMotion]
  );

  const isNodeConnectedToHovered = (nodeId: string): boolean => {
    if (!hoveredNode) return false;
    return currentEdges.some(
      (edge) =>
        (edge.from === hoveredNode && edge.to === nodeId) ||
        (edge.to === hoveredNode && edge.from === nodeId)
    );
  };

  const isEdgeActive = (edge: EdgeConnection): boolean => {
    return (
      edge.from === activeSection ||
      edge.to === activeSection ||
      edge.from === hoveredNode ||
      edge.to === hoveredNode
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
          aria-label="Neural network navigation"
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-2 backdrop-blur-md">
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              className="overflow-visible"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Edges */}
              {currentEdges.map((edge, index) => (
                <NeuralEdge
                  key={`edge-${index}`}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  isActive={isEdgeActive(edge)}
                  isHovered={edge.from === hoveredNode || edge.to === hoveredNode}
                  reducedMotion={reducedMotion}
                />
              ))}

              {/* Nodes */}
              {positions.map((node) => (
                <NeuralNode
                  key={node.id}
                  id={node.id}
                  label={node.label}
                  x={node.x}
                  y={isMobile ? 30 : node.y}
                  isActive={activeSection === node.id}
                  isHovered={hoveredNode === node.id}
                  isConnectedToHovered={isNodeConnectedToHovered(node.id)}
                  onClick={() => handleNodeClick(node.href)}
                  onHover={(hovered) => setHoveredNode(hovered ? node.id : null)}
                  reducedMotion={reducedMotion}
                />
              ))}
            </svg>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
