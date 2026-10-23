import {
  calculateCircularVelocity,
  calculateEscapeVelocity,
  calculateOrbitalPeriod,
  calculateHohmannTransfer,
  calculateTsiolkovskyDeltaV,
  calculateRequiredPropellantMass,
  calculateHillSphereRadius,
  CELESTIAL_MASSES_KG,
  CELESTIAL_RADII_M,
  METERS_PER_AU
} from './index';

export function runPhysicsValidationTests(): { name: string; passed: boolean; details: string }[] {
  const tests: { name: string; passed: boolean; details: string }[] = [];

  // Test 1: Low Earth Orbit Speed (300 km altitude)
  try {
    const rLeo = CELESTIAL_RADII_M.EARTH + 300000;
    const vLeo = calculateCircularVelocity(CELESTIAL_MASSES_KG.EARTH, rLeo);
    // Expected ~ 7726 m/s
    const passed = Math.abs(vLeo - 7726) < 20;
    tests.push({
      name: 'Low Earth Orbit (300km) Circular Velocity',
      passed,
      details: `Calculated: ${(vLeo / 1000).toFixed(2)} km/s (Expected: ~7.73 km/s)`
    });
  } catch (err: any) {
    tests.push({ name: 'LEO Circular Velocity', passed: false, details: err.message });
  }

  // Test 2: Earth Surface Escape Velocity
  try {
    const vEsc = calculateEscapeVelocity(CELESTIAL_MASSES_KG.EARTH, CELESTIAL_RADII_M.EARTH);
    // Expected ~ 11186 m/s
    const passed = Math.abs(vEsc - 11186) < 30;
    tests.push({
      name: 'Earth Surface Escape Velocity',
      passed,
      details: `Calculated: ${(vEsc / 1000).toFixed(2)} km/s (Expected: ~11.19 km/s)`
    });
  } catch (err: any) {
    tests.push({ name: 'Earth Surface Escape Velocity', passed: false, details: err.message });
  }

  // Test 3: Earth Heliocentric Orbital Period
  try {
    const periodSec = calculateOrbitalPeriod(METERS_PER_AU, CELESTIAL_MASSES_KG.SUN);
    const periodDays = periodSec / 86400;
    // Expected ~ 365.25 days
    const passed = Math.abs(periodDays - 365.25) < 0.5;
    tests.push({
      name: 'Earth Keplerian Orbital Period',
      passed,
      details: `Calculated: ${periodDays.toFixed(2)} days (Expected: ~365.25 days)`
    });
  } catch (err: any) {
    tests.push({ name: 'Keplerian Period', passed: false, details: err.message });
  }

  // Test 4: Earth to Mars Hohmann Transfer Duration
  try {
    const rEarth = 1.0 * METERS_PER_AU;
    const rMars = 1.524 * METERS_PER_AU;
    const hohmann = calculateHohmannTransfer(rEarth, rMars, CELESTIAL_MASSES_KG.SUN);
    // Expected transfer time: ~258.8 days (~8.5 months)
    const passed = Math.abs(hohmann.transferDurationDays - 258.8) < 3;
    tests.push({
      name: 'Earth-to-Mars Hohmann Transfer Duration',
      passed,
      details: `Calculated: ${hohmann.transferDurationDays.toFixed(1)} days (~${(hohmann.transferDurationDays / 30.4).toFixed(1)} months)`
    });
  } catch (err: any) {
    tests.push({ name: 'Hohmann Transfer', passed: false, details: err.message });
  }

  // Test 5: Tsiolkovsky Rocket Equation (Hydrolox Isp 450s, 90% fuel fraction)
  try {
    const dryMass = 1000;
    const propMass = 9000; // mass ratio = 10
    const isp = 450;
    const deltaV = calculateTsiolkovskyDeltaV(dryMass, propMass, isp);
    // Δv = 450 * 9.80665 * ln(10) = 4412.99 * 2.302585 = ~10161 m/s
    const passed = Math.abs(deltaV - 10161) < 20;
    tests.push({
      name: 'Tsiolkovsky Rocket Equation (Hydrolox)',
      passed,
      details: `Calculated: ${(deltaV / 1000).toFixed(2)} km/s for mass ratio 10:1`
    });
  } catch (err: any) {
    tests.push({ name: 'Tsiolkovsky Equation', passed: false, details: err.message });
  }

  // Test 6: Earth Hill Sphere Radius
  try {
    const rHill = calculateHillSphereRadius(METERS_PER_AU, CELESTIAL_MASSES_KG.EARTH, CELESTIAL_MASSES_KG.SUN);
    // Earth Hill sphere is approximately 1.5 million km
    const rHillKm = rHill / 1000;
    const passed = Math.abs(rHillKm - 1496500) < 50000;
    tests.push({
      name: 'Earth Gravitational Hill Sphere',
      passed,
      details: `Calculated: ${(rHillKm / 1e6).toFixed(2)} million km (Expected: ~1.50M km)`
    });
  } catch (err: any) {
    tests.push({ name: 'Hill Sphere', passed: false, details: err.message });
  }

  // Test 7: Required Propellant Mass Inversion
  try {
    const dryMass = 1000;
    const deltaV = 10161;
    const isp = 450;
    const propMass = calculateRequiredPropellantMass(dryMass, deltaV, isp);
    // Should be close to 9000 kg (mass ratio 10:1)
    const passed = Math.abs(propMass - 9000) < 50;
    tests.push({
      name: 'Tsiolkovsky Propellant Inversion (Hydrolox)',
      passed,
      details: `Calculated: ${propMass.toFixed(0)} kg propellant (Expected: ~9000 kg)`
    });
  } catch (err: any) {
    tests.push({ name: 'Propellant Mass Inversion', passed: false, details: err.message });
  }

  // Test 8: Arithmetic Overflow Guard Trap
  try {
    // Extreme deltaV of 10,000,000 m/s with small Isp triggers overflow guard
    calculateRequiredPropellantMass(1000, 10000000, 100);
    tests.push({
      name: 'Propellant Arithmetic Overflow Guard',
      passed: false,
      details: 'Failed to trap exponential overflow'
    });
  } catch (err: any) {
    const passed = err.message.includes('overflow') || err.message.includes('exceeds');
    tests.push({
      name: 'Propellant Arithmetic Overflow Guard',
      passed,
      details: `Safely trapped overflow: "${err.message}"`
    });
  }

  return tests;
}
