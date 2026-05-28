export type Konfig = {
  minNewNumberPerIteration: number;
  maxNewNumberPerIteration: number;
  newNumberChance: number;
  abandonChance: number;
  priorityChance: number;
  initialBoothAmount: number;
  minDuration: number;
  maxDuration: number;
  conditionToEnd: (currentIteration: number) => boolean;
};
