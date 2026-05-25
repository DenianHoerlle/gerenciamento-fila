import type { Konfig } from "./Konfig";

export class HotKonfig implements Konfig {
  newNumberChance: number;
  abandonChance: number;
  priorityChance: number;
  initialBoothAmount: number;
  conditionToEnd: (currentIteration: number) => boolean; // pensando ainda

  private constructor(konfig: Konfig) {
    this.newNumberChance = konfig.newNumberChance;
    this.abandonChance = konfig.abandonChance;
    this.priorityChance = konfig.priorityChance;
    this.initialBoothAmount = konfig.initialBoothAmount;
    this.conditionToEnd = konfig.conditionToEnd;
  }

  public static build(): HotKonfig {
    return new HotKonfig({
      newNumberChance: 90,
      abandonChance: 50,
      priorityChance: 30,
      initialBoothAmount: Math.floor(Math.random() * (5 - 3 + 1) + 3),
      conditionToEnd: (currentIteration: number) => currentIteration === 3,
    });
  }
}
