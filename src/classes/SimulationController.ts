import { Snapshot, type SnapshotType } from "./Snapshot";

export class SimulationController {
  snapshots!: SnapshotType[];

  constructor() {
    this.snapshots = [];
  }

  start() {
    this.snapshots.push(new Snapshot().getSnapshot());
  }

  iterate() {
    // TODO advance iteration
    return this.snapshots.at(-1);
  }

  stop() {
    // TODO
  }
}
