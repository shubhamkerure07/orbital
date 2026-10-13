import { OrbitalPreset } from '../types';

export interface BodyState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface SimulationMetrics {
  currentDistance: number;
  currentSpeed: number;
  kineticEnergy: number;
  potentialEnergy: number;
  totalEnergy: number;
  semiMajorAxis: number;
  eccentricity: number;
  periapsis: number;
  apoapsis: number | null; // null for hyperbolic
  orbitalPeriod: number | null;
  escapeVelocity: number;
  isCollided: boolean;
  isEscaped: boolean;
}

// Normalized gravitational constant for simulation stability
export const SIM_G = 1000;

/**
 * Calculates gravitational acceleration components at position (x, y)
 * a = - G * M / r^3 * [x, y]
 */
export function getAcceleration(x: number, y: number, centralMass: number): [number, number] {
  const r2 = x * x + y * y;
  const r = Math.sqrt(r2);
  if (r < 1e-4) return [0, 0];
  const forceMagnitude = -(SIM_G * centralMass) / (r2 * r);
  return [forceMagnitude * x, forceMagnitude * y];
}

/**
 * Velocity Verlet numerical integrator step
 * Produces symplectic, energy-conserving orbits without secular energy drift.
 */
export function verletStep(state: BodyState, centralMass: number, dt: number): BodyState {
  const [ax0, ay0] = getAcceleration(state.x, state.y, centralMass);

  // Position update: x(t+dt) = x(t) + v(t)*dt + 0.5*a(t)*dt^2
  const newX = state.x + state.vx * dt + 0.5 * ax0 * dt * dt;
  const newY = state.y + state.vy * dt + 0.5 * ay0 * dt * dt;

  // New acceleration at x(t+dt)
  const [ax1, ay1] = getAcceleration(newX, newY, centralMass);

  // Velocity update: v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
  const newVx = state.vx + 0.5 * (ax0 + ax1) * dt;
  const newVy = state.vy + 0.5 * (ay0 + ay1) * dt;

  return {
    x: newX,
    y: newY,
    vx: newVx,
    vy: newVy
  };
}

/**
 * Calculates current orbital parameters and telemetry
 */
export function calculateOrbitalMetrics(
  state: BodyState,
  centralMass: number,
  satelliteMass: number = 1,
  collisionRadius: number = 22
): SimulationMetrics {
  const r = Math.sqrt(state.x * state.x + state.y * state.y);
  const v = Math.sqrt(state.vx * state.vx + state.vy * state.vy);

  const mu = SIM_G * centralMass;
  const ke = 0.5 * satelliteMass * v * v;
  const pe = - (mu * satelliteMass) / Math.max(r, 0.001);
  const totalEnergy = ke + pe;

  const escapeVelocity = Math.sqrt((2 * mu) / Math.max(r, 0.001));

  // Angular momentum per unit mass h = r x v = x*vy - y*vx
  const h = state.x * state.vy - state.y * state.vx;

  // Specific orbital energy epsilon = E / m = v^2/2 - mu/r
  const epsilon = 0.5 * v * v - mu / Math.max(r, 0.001);

  // Semi-major axis a = -mu / (2 * epsilon)
  let a = 0;
  let eccentricity = 0;
  let periapsis = 0;
  let apoapsis: number | null = null;
  let period: number | null = null;

  if (Math.abs(epsilon) > 1e-6) {
    a = -mu / (2 * epsilon);
    const term = 1 + (2 * epsilon * h * h) / (mu * mu);
    eccentricity = Math.sqrt(Math.max(0, term));

    if (eccentricity < 1 && a > 0) {
      periapsis = a * (1 - eccentricity);
      apoapsis = a * (1 + eccentricity);
      period = 2 * Math.PI * Math.sqrt((a * a * a) / mu);
    } else {
      // Hyperbolic or parabolic escape
      periapsis = Math.abs(a) * (eccentricity - 1);
      apoapsis = null;
      period = null;
    }
  } else {
    // Parabolic limit
    eccentricity = 1.0;
    periapsis = (h * h) / (2 * mu);
  }

  const isCollided = r <= collisionRadius;
  const isEscaped = r > 1800 || (eccentricity >= 1.0 && r > 600);

  return {
    currentDistance: r,
    currentSpeed: v,
    kineticEnergy: ke,
    potentialEnergy: pe,
    totalEnergy,
    semiMajorAxis: a,
    eccentricity,
    periapsis,
    apoapsis,
    orbitalPeriod: period,
    escapeVelocity,
    isCollided,
    isEscaped
  };
}

/**
 * Pre-computes predicted path points (Keplerian trajectory) for visualization overlay
 */
export function predictOrbitPath(
  initialState: BodyState,
  centralMass: number,
  maxSteps: number = 800,
  dt: number = 0.15
): [number, number][] {
  const points: [number, number][] = [];
  let s: BodyState = { ...initialState };
  for (let i = 0; i < maxSteps; i++) {
    points.push([s.x, s.y]);
    s = verletStep(s, centralMass, dt);
    const r = Math.sqrt(s.x * s.x + s.y * s.y);
    if (r < 18 || r > 1600) break;
  }
  return points;
}

export const ORBITAL_PRESETS: OrbitalPreset[] = [
  {
    id: 'circular',
    name: 'Stable Circular Orbit',
    description: 'Centripetal gravitational pull exactly balances orbital inertial velocity (v = √(GM/r)). Eccentricity is zero.',
    centralMass: 100,
    radius: 180,
    velocity: 23.57, // sqrt(1000 * 100 / 180) = 23.57
    theoreticalTrajectory: 'circular',
    notes: 'The condition for a stable circular trajectory requires constant orbital speed with zero radial acceleration.'
  },
  {
    id: 'elliptical-hohmann',
    name: 'Elliptical Transfer Orbit',
    description: 'Initial velocity exceeds circular speed but remains below escape velocity. The object reaches a high apoapsis.',
    centralMass: 100,
    radius: 120,
    velocity: 33.0,
    theoreticalTrajectory: 'elliptical',
    notes: 'Demonstrates Kepler’s Second Law: the satellite sweeps equal areas in equal times, speeding up at periapsis and slowing at apoapsis.'
  },
  {
    id: 'decaying',
    name: 'Sub-Orbital Decaying Trajectory',
    description: 'Insufficient orbital speed causes gravity to dominate, pulling the satellite into an impact with the central body.',
    centralMass: 100,
    radius: 200,
    velocity: 12.0,
    theoreticalTrajectory: 'decay',
    notes: 'When tangential speed is too low to outrun downward gravitational acceleration, the trajectory intersects the planet’s surface.'
  },
  {
    id: 'escape',
    name: 'Hyperbolic Escape Trajectory',
    description: 'Velocity surpasses the escape threshold (v > √(2GM/r)). The satellite breaks free from the gravitational well into deep space.',
    centralMass: 100,
    radius: 150,
    velocity: 42.0, // v_esc = sqrt(2 * 100000 / 150) = 36.5
    theoreticalTrajectory: 'hyperbolic',
    notes: 'Positive total mechanical energy (E > 0). The trajectory forms an open hyperbolic curve that never returns.'
  }
];
