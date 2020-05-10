export const boundValue = (minimum: number, value: number, maximum: number): number => {
  if (value < minimum) return minimum
  if (value > maximum) return maximum
  return value
}
