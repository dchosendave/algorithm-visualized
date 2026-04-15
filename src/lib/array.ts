export function generateRandomArray(
  length: number,
  min = 10,
  max = 99
): number[] {
  return Array.from({ length }, () => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  })
}
