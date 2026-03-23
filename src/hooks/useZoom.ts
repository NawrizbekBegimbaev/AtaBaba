import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

function getInitialScale(width: number): number {
  if (width < 480) return 0.55;
  if (width < 768) return 0.65;
  if (width < 1024) return 0.75;
  return 0.85;
}

export function useZoom(svgRef: React.RefObject<SVGSVGElement | null>) {
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const transformRef = useRef<d3.ZoomTransform>(d3.zoomIdentity);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = svg.select<SVGGElement>('g.tree-container');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 4])
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr('transform', event.transform.toString());
        transformRef.current = event.transform;
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Initial position: center the root with adaptive scale
    const rect = svgRef.current.getBoundingClientRect();
    const scale = getInitialScale(rect.width);
    const initialTransform = d3.zoomIdentity.translate(rect.width / 2, 80).scale(scale);
    svg.call(zoom.transform, initialTransform);

    return () => {
      svg.on('.zoom', null);
    };
  }, [svgRef]);

  const zoomIn = useCallback(() => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
  }, [svgRef]);

  const zoomOut = useCallback(() => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.7);
  }, [svgRef]);

  const resetView = useCallback(() => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    const rect = svgRef.current.getBoundingClientRect();
    const scale = getInitialScale(rect.width);
    const transform = d3.zoomIdentity.translate(rect.width / 2, 80).scale(scale);
    svg.transition().duration(500).call(zoomBehaviorRef.current.transform, transform);
  }, [svgRef]);

  const panTo = useCallback(
    (x: number, y: number) => {
      if (!svgRef.current || !zoomBehaviorRef.current) return;
      const svg = d3.select(svgRef.current);
      const rect = svgRef.current.getBoundingClientRect();
      const scale = transformRef.current.k;
      const transform = d3.zoomIdentity
        .translate(rect.width / 2 - x * scale, rect.height / 3 - y * scale)
        .scale(scale);
      svg.transition().duration(600).call(zoomBehaviorRef.current.transform, transform);
    },
    [svgRef]
  );

  return { zoomIn, zoomOut, resetView, panTo };
}
