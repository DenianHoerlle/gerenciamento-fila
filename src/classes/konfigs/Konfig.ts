export type Konfig = {
  newNumberChance: number;
  abandonChance: number;
  priorityChance: number;
  initialBoothAmount: number;
  conditionToEnd: (currentIteration: number) => boolean;
};
