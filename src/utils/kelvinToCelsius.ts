export function kelvinToCelsius(kelvin: number): number {
  const temperature = kelvin - 273.15;
  return Math.floor(temperature);
}