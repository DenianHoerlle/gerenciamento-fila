import { Booth } from "./Booth";
import { CircularLinkedList } from "./CircularLinkedList";

export class BoothController<T> {
  private booths: CircularLinkedList<Booth<T>>;
  private size: number;
  private occupiedAmount: number;

  constructor(initialBoothAmount: number) {
    this.booths = new CircularLinkedList<Booth<T>>();
    this.size = 0;
    this.occupiedAmount = 0;

    for (let i = 0; i < initialBoothAmount; i++) {
      const newBooth = new Booth<T>();
      this.booths.add(newBooth);
      this.size++;
    }
  }

  public getBooths(): Booth<T>[] {
    return this.booths.toArray();
  }

  public getSize(): number {
    return this.size;
  }

  public getOccupiedAmount(): number {
    return this.occupiedAmount;
  }

  public openBooth(): void {
    const newBooth = new Booth<T>();
    this.booths.add(newBooth);
    this.size++;
  }

  public closeBooth(): boolean {
    if (this.size <= 1) {
      return false;
    }

    const allBooths = this.booths.toArray();

    for (const booth of allBooths) {
      if (!booth.isOccupied()) {
        this.booths.remove(booth);
        this.size--;
        return true;
      }
    }

    return false;
  }

  public receiveNumber(number: T, duration: number): boolean {
    if (this.isFull()) {
      return false;
    }

    let attempts = 0;
    while (attempts < this.size) {
      const booth = this.booths.getNext();
      if (booth && !booth.isOccupied()) {
        booth.setCurrentNumber(number);
        booth.setDuration(duration);
        this.occupiedAmount++;
        return true;
      }
      attempts++;
    }

    return false;
  }

  public finishAttendance(): T[] {
    const finishedNumbers: T[] = [];
    const allBooths = this.booths.toArray();

    for (const booth of allBooths) {
      if (booth.isOccupied() && booth.getDuration() === 0) {
        const finishedNumber = booth.finish();
        if (finishedNumber !== null) {
          finishedNumbers.push(finishedNumber);
          this.occupiedAmount--;
        }
      }
    }

    return finishedNumbers;
  }

  public iterate(): void {
    const allBooths = this.booths.toArray();

    for (const booth of allBooths) {
      if (booth.isOccupied()) {
        booth.decrementDuration();
      }
    }
  }

  public isFull(): boolean {
    return this.occupiedAmount === this.size;
  }
}
