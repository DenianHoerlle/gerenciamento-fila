import type { BoothType } from "./Booth";

// TODO create classes

export type SnapshotType = {
  normalQueue: number[];
  priorityQueue: number[];
  booths: BoothType<number>[];
  stack: number[];
  nextTwo: (number | undefined)[];
  abandonCounter: number;
  iteration: number;
};

// export class Snapshot {
//   normalQueue: NormalQueue;
//   priorityQueue: PriorityQueue;
//   booths: Booth<number>[];
//   stack: AttendanceStack;
//   nextTwo: (number | undefined)[];
//   abandonCounter: number;

//   constructor() {
//     this.normalQueue = new NormalQueue();
//     this.priorityQueue = new PriorityQueue();
//     this.booths = [new Booth(), new Booth(), new Booth()];
//     this.stack = new AttendanceStack();
//     this.nextTwo = [undefined, undefined];
//     this.abandonCounter = 0;
//   }
// }
