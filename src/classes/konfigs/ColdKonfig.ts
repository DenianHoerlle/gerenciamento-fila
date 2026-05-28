import type { Konfig } from "./Konfig";

export class ColdKonfig implements Konfig {
  newNumberChance: number;
  abandonChance: number;
  priorityChance: number;
  initialBoothAmount: number;
  conditionToEnd: (currentIteration: number) => boolean; // pensando ainda
  minDuration: number;
  maxDuration: number;
  maxNewNumberPerIteration: number;
  minNewNumberPerIteration: number;

  private constructor(konfig: Konfig) {
    this.newNumberChance = konfig.newNumberChance;
    this.abandonChance = konfig.abandonChance;
    this.priorityChance = konfig.priorityChance;
    this.initialBoothAmount = konfig.initialBoothAmount;
    this.conditionToEnd = konfig.conditionToEnd;
    this.minDuration = konfig.minDuration;
    this.maxDuration = konfig.maxDuration;
    this.minNewNumberPerIteration = konfig.minNewNumberPerIteration;
    this.maxNewNumberPerIteration = konfig.maxNewNumberPerIteration;
  }

  public static build(): ColdKonfig {
    return new ColdKonfig({
      newNumberChance: 23,
      abandonChance: 15,
      priorityChance: 15,
      initialBoothAmount: Math.floor(Math.random() * (5 - 3 + 1) + 3),
      conditionToEnd: (currentIteration: number) => currentIteration === 10,
      minDuration: 1,
      maxDuration: 3,
      maxNewNumberPerIteration: 6,
      minNewNumberPerIteration: 3,
    });
  }
}
