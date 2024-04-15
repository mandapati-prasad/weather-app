export function convertSpeed(metersPerSecond: number): string {
  const kph = metersPerSecond * 3.6;
  return `${kph.toFixed(0)}km/h`; // 1 m/s = 3.6 km/h
}
