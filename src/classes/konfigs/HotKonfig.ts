import type { Konfig } from "./Konfig";

export class HotKonfig implements Konfig {
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

  public static build(): HotKonfig {
    return new HotKonfig({
      newNumberChance: 50,
      abandonChance: 50,
      priorityChance: 30,
      initialBoothAmount: Math.floor(Math.random() * (5 - 3 + 1) + 3),
      conditionToEnd: (currentIteration: number) => currentIteration === 10,
      minDuration: 1,
      maxDuration: 3,
      maxNewNumberPerIteration: 10,
      minNewNumberPerIteration: 5,
    });
  }
}
