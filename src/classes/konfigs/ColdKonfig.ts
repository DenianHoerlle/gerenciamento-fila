import type { Konfig } from "./Konfig";

export class ColdKonfig implements Konfig {
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

  public static build(): ColdKonfig {
    return new ColdKonfig({
      newNumberChance: 23,
      abandonChance: 15,
      priorityChance: 15,
      initialBoothAmount: Math.floor(Math.random() * (5 - 3 + 1) + 3),
      conditionToEnd: (currentIteration: number) => currentIteration === 3,
    });
  }
}
