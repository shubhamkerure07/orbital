import React, { useRef, useEffect } from 'react';
import { PLANETS, SUN_DATA } from '../../data/planets';
import { PlanetData } from '../../types';

interface SolarFallback2DProps {
  onSelectPlanet: (planet: PlanetData) => void;
  selectedPlanet: PlanetData | null;
  speedMultiplier: number;
  isPaused: boolean;
  showLabels: boolean;
}

export const SolarFallback2D: React.FC<SolarFallback2DProps> = ({
  onSelectPlanet,
  selectedPlanet,
  speedMultiplier,
  isPaused,
  showLabels
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Resize to container
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 80;

      // Clear dark background
      ctx.fillStyle = '#08090C';
      ctx.fillRect(0, 0, width, height);

      // Starfield background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 271.3) % height);
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Draw Sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#FDB813';
      ctx.shadowColor = '#FF8C00';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Orbit rings & planets
      PLANETS.forEach((planet, index) => {
        const orbitRadius = (index + 1) * 3.8 * scale;

        // Orbit ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = planet.id === selectedPlanet?.id ? 'rgba(229, 169, 60, 0.5)' : 'rgba(71, 85, 105, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Current planet angle
        const orbitSpeed = (1 / Math.sqrt(planet.orbitalPeriodDays)) * 0.08 * speedMultiplier;
        const currentAngle = timeRef.current * orbitSpeed + index * 1.5;
        const px = centerX + Math.cos(currentAngle) * orbitRadius;
        const py = centerY + Math.sin(currentAngle) * orbitRadius;

        // Selection ring
        if (planet.id === selectedPlanet?.id) {
          ctx.beginPath();
          ctx.arc(px, py, 14, 0, Math.PI * 2);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Planet body
        ctx.beginPath();
        const planetRadius = Math.max(3.5, planet.sizeVisualScale * 4);
        ctx.arc(px, py, planetRadius, 0, Math.PI * 2);
        ctx.fillStyle = planet.colorHex;
        ctx.fill();

        // Planet Label
        if (showLabels) {
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillStyle = planet.id === selectedPlanet?.id ? '#F59E0B' : '#94A3B8';
          ctx.fillText(planet.name, px + 8, py - 6);
        }
      });

      if (!isPaused) {
        timeRef.current += 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [speedMultiplier, isPaused, showLabels, selectedPlanet]);

  // Click handler on 2D canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 80;

    // Check hit against each planet position
    let clickedPlanet: PlanetData | null = null;
    PLANETS.forEach((planet, index) => {
      const orbitRadius = (index + 1) * 3.8 * scale;
      const orbitSpeed = (1 / Math.sqrt(planet.orbitalPeriodDays)) * 0.08 * speedMultiplier;
      const currentAngle = timeRef.current * orbitSpeed + index * 1.5;
      const px = centerX + Math.cos(currentAngle) * orbitRadius;
      const py = centerY + Math.sin(currentAngle) * orbitRadius;

      const dist = Math.hypot(x - px, y - py);
      if (dist < 18) {
        clickedPlanet = planet;
      }
    });

    if (clickedPlanet) {
      onSelectPlanet(clickedPlanet);
    }
  };

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full block"
      />
      <div className="absolute top-4 left-4 px-2.5 py-1 bg-space-900/80 border border-slate-700/60 rounded text-[11px] font-mono text-slate-400">
        2D Precision Scientific Mode (Interactive)
      </div>
    </div>
  );
};
