import React, { useRef, useEffect } from 'react';
import { BodyState, SimulationMetrics, verletStep, calculateOrbitalMetrics, predictOrbitPath } from '../../utils/physics';

interface OrbitalCanvasProps {
  centralMass: number;
  initialRadius: number;
  initialVelocity: number;
  velocityAngleDeg: number;
  simSpeed: number;
  isPaused: boolean;
  onMetricsUpdate: (metrics: SimulationMetrics) => void;
  resetTrigger: number;
}

export const OrbitalCanvas: React.FC<OrbitalCanvasProps> = ({
  centralMass,
  initialRadius,
  initialVelocity,
  velocityAngleDeg,
  simSpeed,
  isPaused,
  onMetricsUpdate,
  resetTrigger
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State refs for smooth 60fps canvas loop without react rerender lag
  const bodyRef = useRef<BodyState>({
    x: 0,
    y: -initialRadius,
    vx: initialVelocity,
    vy: 0
  });

  const trailRef = useRef<[number, number][]>([]);

  // Reset body whenever user changes initial parameters or clicks reset
  useEffect(() => {
    // Angle: 90 deg = purely tangential velocity
    const rad = (velocityAngleDeg * Math.PI) / 180;
    const vx = initialVelocity * Math.sin(rad);
    const vy = -initialVelocity * Math.cos(rad);

    bodyRef.current = {
      x: initialRadius,
      y: 0,
      vx: vx,
      vy: vy
    };
    trailRef.current = [];
  }, [initialRadius, initialVelocity, velocityAngleDeg, centralMass, resetTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 550);

      const centerX = width / 2;
      const centerY = height / 2;

      // Dark observatory background
      ctx.fillStyle = '#08090C';
      ctx.fillRect(0, 0, width, height);

      // Coordinate radar grid
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.15)';
      ctx.lineWidth = 1;
      const gridSpacing = 50;
      for (let x = centerX % gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = centerY % gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Gravitational potential well concentric rings
      [60, 120, 180, 240, 300].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(229, 169, 60, 0.08)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Theoretical predicted Kepler trajectory (dotted cyan path)
      const predicted = predictOrbitPath(bodyRef.current, centralMass, 450, 0.15);
      if (predicted.length > 1) {
        ctx.beginPath();
        ctx.moveTo(centerX + predicted[0][0], centerY + predicted[0][1]);
        for (let i = 1; i < predicted.length; i++) {
          ctx.lineTo(centerX + predicted[i][0], centerY + predicted[i][1]);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Central Body (The Sun / Planet)
      const centralRadius = Math.max(16, Math.min(32, Math.sqrt(centralMass) * 2.2));
      const sunGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, centralRadius * 1.5);
      sunGrad.addColorStop(0, '#FFEAA7');
      sunGrad.addColorStop(0.5, '#F59E0B');
      sunGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, centralRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, centralRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#E5A93C';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update Physics Steps if not paused
      const metrics = calculateOrbitalMetrics(bodyRef.current, centralMass, 1, centralRadius);
      onMetricsUpdate(metrics);

      if (!isPaused && !metrics.isCollided && !metrics.isEscaped) {
        const subSteps = 6;
        const dt = (0.075 * simSpeed) / subSteps;
        for (let i = 0; i < subSteps; i++) {
          bodyRef.current = verletStep(bodyRef.current, centralMass, dt);
        }

        trailRef.current.push([bodyRef.current.x, bodyRef.current.y]);
        if (trailRef.current.length > 500) {
          trailRef.current.shift();
        }
      }

      // Draw Orbit Trail (Gradient Gold/Cyan)
      if (trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(centerX + trailRef.current[0][0], centerY + trailRef.current[0][1]);
        for (let i = 1; i < trailRef.current.length; i++) {
          ctx.lineTo(centerX + trailRef.current[i][0], centerY + trailRef.current[i][1]);
        }
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Orbiting Satellite
      const sx = centerX + bodyRef.current.x;
      const sy = centerY + bodyRef.current.y;

      // Velocity Vector Arrow
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + bodyRef.current.vx * 3.5, sy + bodyRef.current.vy * 3.5);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Satellite point
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#F8FAFC';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Collision indicator
      if (metrics.isCollided) {
        ctx.font = '14px JetBrains Mono, monospace';
        ctx.fillStyle = '#EF4444';
        ctx.textAlign = 'center';
        ctx.fillText('CRASH: Orbit Intersected Central Body Surface', centerX, centerY + centralRadius + 30);
      } else if (metrics.isEscaped) {
        ctx.font = '14px JetBrains Mono, monospace';
        ctx.fillStyle = '#10B981';
        ctx.textAlign = 'center';
        ctx.fillText('ESCAPE TRAJECTORY: Satellite exceeded Escape Velocity', centerX, height - 30);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [centralMass, simSpeed, isPaused, onMetricsUpdate]);

  return (
    <div className="w-full h-[450px] sm:h-[550px] relative rounded-2xl overflow-hidden border border-slate-800 bg-space-950">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Visual Overlay Legend */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 text-[11px] font-mono text-slate-400 bg-space-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
          <span>Active Orbit History</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-0.5 bg-cyan-400" />
          <span>Keplerian Analytical Prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-100" />
          <span>Spacecraft State (Vector v)</span>
        </div>
      </div>
    </div>
  );
};
