/**
 * Formats large numerical values with scientific or readable comma notation
 */
export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-US').format(val);
}

/**
 * Formats distances in Millions of kilometers or AU
 */
export function formatDistance(millionsKm: number): string {
  if (millionsKm >= 1000) {
    return `${(millionsKm / 1000).toFixed(2)} Billion km`;
  }
  return `${millionsKm.toFixed(1)} Million km`;
}

/**
 * Formats mass in kilograms or Earth-relative
 */
export function formatEarthRelative(val: number): string {
  if (val >= 100) return `${val.toFixed(0)}× Earth`;
  if (val >= 1) return `${val.toFixed(2)}× Earth`;
  return `${val.toFixed(3)}× Earth`;
}

/**
 * Formats temperatures in Celsius with Fahrenheit conversion
 */
export function formatTempCelsius(celsius: number): string {
  const fahr = Math.round((celsius * 9) / 5 + 32);
  const sign = celsius > 0 ? '+' : '';
  return `${sign}${celsius}°C (${sign}${fahr}°F)`;
}
