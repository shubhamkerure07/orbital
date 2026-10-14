/**
 * ORBITAL Scientific Physics Engine
 * Shared mathematical and physical computation layer using SI units.
 * 
 * Formulas:
 * - Gravitational Parameter: μ = G * M
 * - Vis-Viva Equation: v = √(μ * (2/r - 1/a))
 * - Circular Orbit Speed: v_circ = √(μ / r)
 * - Escape Speed: v_esc = √(2 * μ / r)
 * - Orbital Period: T = 2 * π * √(a³ / μ)
 * - Hohmann Transfer:
 *     a_trans = (r1 + r2) / 2
 *     Δv1 = √(μ/r1) * (√(2*r2 / (r1 + r2)) - 1)
 *     Δv2 = √(μ/r2) * (1 - √(2*r1 / (r1 + r2)))
 *     t_trans = π * √(a_trans³ / μ)
 * - Tsiolkovsky Rocket Equation: Δv = Isp * g0 * ln(m0 / mf)
 * - Hill Sphere Radius: r_H ≈ a * ∛(m / (3 * M))
 */

// Universal Gravitational Constant (m^3 kg^-1 s^-2)
export const G_CONST = 6.67430e-11;

// Standard Earth Sea-Level Gravitational Acceleration (m/s^2)
export const G0_EARTH = 9.80665;

// Astronomical Unit in meters
export const METERS_PER_AU = 149597870700;

// Celestial Mass Constants in Kilograms
export const CELESTIAL_MASSES_KG = {
  SUN: 1.9885e30,
  MERCURY: 3.3011e23,
  VENUS: 4.8675e24,
  EARTH: 5.9722e24,
  MOON: 7.342e22,
  MARS: 6.4171e23,
  JUPITER: 1.8982e27,
  SATURN: 5.6834e26,
  URANUS: 8.6810e25,
  NEPTUNE: 1.02413e26,
};

// Celestial Mean Radii in Meters
export const CELESTIAL_RADII_M = {
  SUN: 696340000,
  MERCURY: 2439700,
  VENUS: 6051800,
  EARTH: 6371000,
  MOON: 1737400,
  MARS: 3389500,
  JUPITER: 69911000,
  SATURN: 58232000,
  URANUS: 25362000,
  NEPTUNE: 24622000,
};

/**
 * Standard Gravitational Parameter μ = G * M (m^3 / s^2)
 */
export function getStandardGravitationalParameter(massKg: number): number {
  if (massKg <= 0) throw new Error('Mass must be strictly positive');
  return G_CONST * massKg;
}

/**
 * Circular orbital velocity at distance r from center of mass M
 * v = √(μ / r)
 * @param massKg Central body mass in kg
 * @param radiusM Distance from center in meters
 * @returns velocity in m/s
 */
export function calculateCircularVelocity(massKg: number, radiusM: number): number {
  if (radiusM <= 0) throw new Error('Orbital radius must be positive');
  const mu = getStandardGravitationalParameter(massKg);
  return Math.sqrt(mu / radiusM);
}

/**
 * Escape velocity at distance r from center of mass M
 * v_esc = √(2 * μ / r)
 * @param massKg Central body mass in kg
 * @param radiusM Distance from center in meters
 * @returns escape speed in m/s
 */
export function calculateEscapeVelocity(massKg: number, radiusM: number): number {
  if (radiusM <= 0) throw new Error('Orbital radius must be positive');
  const mu = getStandardGravitationalParameter(massKg);
  return Math.sqrt((2 * mu) / radiusM);
}

/**
 * Orbital period via Kepler's Third Law: T = 2π * √(a³ / μ)
 * @param semiMajorAxisM Semi-major axis in meters
 * @param centralMassKg Central body mass in kg
 * @returns period in seconds
 */
export function calculateOrbitalPeriod(semiMajorAxisM: number, centralMassKg: number): number {
  if (semiMajorAxisM <= 0) throw new Error('Semi-major axis must be positive for bound orbit');
  const mu = getStandardGravitationalParameter(centralMassKg);
  return 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxisM, 3) / mu);
}

/**
 * Vis-Viva equation for velocity at any point on an elliptic/hyperbolic orbit
 * v = √(μ * (2/r - 1/a))
 */
export function calculateVisVivaVelocity(
  rM: number,
  semiMajorAxisM: number,
  centralMassKg: number
): number {
  if (rM <= 0) throw new Error('Current distance must be positive');
  const mu = getStandardGravitationalParameter(centralMassKg);
  const vSq = mu * (2 / rM - 1 / semiMajorAxisM);
  return Math.sqrt(Math.max(0, vSq));
}

export interface HohmannTransferResult {
  deltaV1_ms: number;       // Departure burn Δv (m/s)
  deltaV2_ms: number;       // Arrival capture burn Δv (m/s)
  totalDeltaV_ms: number;   // Total mission Δv budget (m/s)
  transferDurationSec: number; // Flight duration in seconds
  transferDurationDays: number;// Flight duration in Earth days
  semiMajorAxisTransM: number; // Transfer ellipse semi-major axis (m)
}

/**
 * Calculates co-planar Hohmann transfer orbit between two circular orbits r1 and r2
 */
export function calculateHohmannTransfer(
  r1_M: number,
  r2_M: number,
  centralMassKg: number
): HohmannTransferResult {
  if (r1_M <= 0 || r2_M <= 0) throw new Error('Orbit radii must be positive');
  const mu = getStandardGravitationalParameter(centralMassKg);

  const a_trans = (r1_M + r2_M) / 2;

  // Initial circular velocity at r1
  const v1 = Math.sqrt(mu / r1_M);
  // Velocity on transfer ellipse at periapsis r1
  const v_trans1 = Math.sqrt(mu * (2 / r1_M - 1 / a_trans));
  const deltaV1 = Math.abs(v_trans1 - v1);

  // Velocity on transfer ellipse at apoapsis r2
  const v_trans2 = Math.sqrt(mu * (2 / r2_M - 1 / a_trans));
  // Final circular velocity at r2
  const v2 = Math.sqrt(mu / r2_M);
  const deltaV2 = Math.abs(v2 - v_trans2);

  const transferTimeSec = Math.PI * Math.sqrt(Math.pow(a_trans, 3) / mu);

  return {
    deltaV1_ms: deltaV1,
    deltaV2_ms: deltaV2,
    totalDeltaV_ms: deltaV1 + deltaV2,
    transferDurationSec: transferTimeSec,
    transferDurationDays: transferTimeSec / 86400,
    semiMajorAxisTransM: a_trans
  };
}

/**
 * Tsiolkovsky Rocket Equation: Δv = Isp * g0 * ln(m0 / mf)
 * Returns the maximum achievable Δv for given masses and specific impulse.
 */
export function calculateTsiolkovskyDeltaV(
  dryMassKg: number,
  propellantMassKg: number,
  ispSeconds: number
): number {
  if (dryMassKg <= 0) throw new Error('Dry mass must be positive');
  if (propellantMassKg < 0) throw new Error('Propellant mass cannot be negative');
  if (ispSeconds <= 0) throw new Error('Isp must be positive');

  const m0 = dryMassKg + propellantMassKg;
  const mf = dryMassKg;
  return ispSeconds * G0_EARTH * Math.log(m0 / mf);
}

/**
 * Calculates propellant mass required to achieve a target Δv
 * m_prop = m_dry * (exp(Δv / (Isp * g0)) - 1)
 */
export function calculateRequiredPropellantMass(
  dryMassKg: number,
  targetDeltaV_ms: number,
  ispSeconds: number
): number {
  if (dryMassKg <= 0 || targetDeltaV_ms < 0 || ispSeconds <= 0) {
    throw new Error('Invalid mass, deltaV or Isp parameters');
  }
  const exponent = targetDeltaV_ms / (ispSeconds * G0_EARTH);
  return dryMassKg * (Math.exp(exponent) - 1);
}

/**
 * Hill Sphere Radius: r_H ≈ a * ∛(m / (3 * M))
 * Approximate boundary of gravitational dominance for a body orbiting a primary.
 */
export function calculateHillSphereRadius(
  semiMajorAxisM: number,
  bodyMassKg: number,
  primaryMassKg: number
): number {
  if (semiMajorAxisM <= 0 || bodyMassKg <= 0 || primaryMassKg <= 0) {
    throw new Error('All parameters must be strictly positive');
  }
  return semiMajorAxisM * Math.cbrt(bodyMassKg / (3 * primaryMassKg));
}
