import { useMemo } from 'react';

export interface NodePosition {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  angle: number;
}

export interface EdgeConnection {
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface UseNeuralLayoutOptions {
  nodes: Array<{ label: string; href: string }>;
  width: number;
  height: number;
  arcAngle?: number;
  arcRadius?: number;
  nodeRadius?: number;
}

export function useNeuralLayout({
  nodes,
  width,
  height,
  arcAngle = 140,
  arcRadius,
  nodeRadius = 20,
}: UseNeuralLayoutOptions) {
  return useMemo(() => {
    const centerX = width / 2;
    const centerY = height * 0.6;
    const radius = arcRadius ?? Math.min(width * 0.4, 200);

    const startAngle = (180 - arcAngle) / 2;
    const angleStep = arcAngle / (nodes.length - 1);

    const nodePositions: NodePosition[] = nodes.map((node, index) => {
      const angleDeg = startAngle + index * angleStep;
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY - radius * Math.sin(angleRad);

      return {
        id: node.href.slice(1),
        label: node.label,
        href: node.href,
        x,
        y,
        angle: angleDeg,
      };
    });

    const edges: EdgeConnection[] = [];
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const from = nodePositions[i];
      const to = nodePositions[i + 1];

      const angle1 = Math.atan2(to.y - from.y, to.x - from.x);
      const angle2 = angle1 + Math.PI;

      edges.push({
        from: from.id,
        to: to.id,
        x1: from.x + nodeRadius * Math.cos(angle1),
        y1: from.y + nodeRadius * Math.sin(angle1),
        x2: to.x + nodeRadius * Math.cos(angle2),
        y2: to.y + nodeRadius * Math.sin(angle2),
      });
    }

    return { nodePositions, edges, centerX, centerY, radius };
  }, [nodes, width, height, arcAngle, arcRadius, nodeRadius]);
}

export function useResponsiveLayout(isMobile: boolean) {
  return useMemo(() => {
    if (isMobile) {
      return {
        width: 320,
        height: 60,
        arcAngle: 0,
        arcRadius: 0,
        nodeRadius: 18,
        isHorizontal: true,
      };
    }
    return {
      width: 500,
      height: 120,
      arcAngle: 140,
      arcRadius: 180,
      nodeRadius: 20,
      isHorizontal: false,
    };
  }, [isMobile]);
}

export function getHorizontalPositions(
  nodes: Array<{ label: string; href: string }>,
  width: number,
  nodeRadius: number
): NodePosition[] {
  const padding = 20;
  const availableWidth = width - padding * 2;
  const spacing = availableWidth / (nodes.length - 1);

  return nodes.map((node, index) => ({
    id: node.href.slice(1),
    label: node.label,
    href: node.href,
    x: padding + index * spacing,
    y: 30,
    angle: 0,
  }));
}
