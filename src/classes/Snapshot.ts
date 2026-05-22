// TODO create classes
class NormalQueue {}
class PriorityQueue {}
class Booth {}
class AttendanceStack {}

export type SnapshotType = {
  normalQueue: number[];
  priorityQueue: number[];
  booths: [{}, {}, {}]; // TODO create BoothType
  stack: number[];
  nextTwo: (number | null)[];
  abandonCounter: number;
};

export class Snapshot {
  normalQueue: NormalQueue;
  priorityQueue: PriorityQueue;
  booths: Booth[];
  stack: AttendanceStack;
  nextTwo: (number | null)[];
  abandonCounter: number;

  constructor() {
    this.normalQueue = new NormalQueue();
    this.priorityQueue = new PriorityQueue();
    this.booths = [new Booth(), new Booth(), new Booth()];
    this.stack = new AttendanceStack();
    this.nextTwo = [null, null];
    this.abandonCounter = 0;
  }

  public getSnapshot(): SnapshotType {
    return {
      normalQueue: [],
      priorityQueue: [],
      booths: [{}, {}, {}],
      stack: [],
      nextTwo: [null, null],
      abandonCounter: 0,
    };
  }
}
