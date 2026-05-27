export class Booth<T> {
    private currentNumber: T | null;
    private duration: number;

    constructor() {
        this.currentNumber = null;
        this.duration = 0;
    }

    public getCurrentNumber(): T | null {
        return this.currentNumber;
    }

    public setCurrentNumber(number: T): void {
        this.currentNumber = number;
    }

    public getDuration(): number {
        return this.duration;
    }

    public setDuration(duration: number): void {
        this.duration = duration;
    }

    public isOccupied(): boolean {
        return this.currentNumber !== null;
    }

    public decrementDuration(): void {
        if (this.duration > 0) {
            this.duration--;
        }   
    }

    public finish(): T | null {
        const finished = this.currentNumber;
        this.currentNumber = null;
        this.duration = 0;
        return finished;
    }
}