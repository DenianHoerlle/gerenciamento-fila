import type { Konfig } from "./Konfig";

export class HotKonfig implements Konfig {
    newNumberChance: number;
    abandonChance: number;
    priorityChance: number;
    initialBoothAmount: number;
    conditionToEnd: boolean; // pensando ainda

    private constructor(
        newNumberChance: number, 
        abandonChance: number, 
        priorityChance: number, 
        initialBoothAmount: number, 
        conditionToEnd: boolean 
    ) {
        this.newNumberChance = newNumberChance;
        this.abandonChance = abandonChance;
        this.priorityChance = priorityChance;
        this.initialBoothAmount = initialBoothAmount;
        this.conditionToEnd = conditionToEnd;
    }

    public build(): HotKonfig {
        return new HotKonfig(45, 30, 30, Math.floor(Math.random() * (5 - 3 + 1) + 3), false);
    }
}