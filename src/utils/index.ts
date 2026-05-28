// Receives a number between 0 and 100;
export const generateRandomness = (chance: number): boolean => {
  return Math.random() * 100 < chance;
};

export const generateNumberFromInterval = (
  min: number,
  max: number,
): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
