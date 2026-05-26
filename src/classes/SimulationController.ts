import { generateRandomness } from "../utils";
import type { Konfig } from "./konfigs/Konfig";
import { QueuesController } from "./QueuesController";
import { type SnapshotType } from "./Snapshot";

export class SimulationController {
  snapshots: SnapshotType[];
  queuesController: QueuesController;
  konfig!: Konfig;
  currentIteration: number;
  isFinished: boolean = false;

  constructor() {
    this.currentIteration = 0;
    this.snapshots = [];
    this.queuesController = new QueuesController();
  }

  public start(konfig: Konfig): SnapshotType {
    const firstSnapshot: SnapshotType = {
      normalQueue: [],
      priorityQueue: [],
      booths: [{}, {}, {}],
      stack: [],
      nextTwo: [undefined, undefined],
      abandonCounter: 0,
      iteration: 0,
    };

    this.konfig = konfig;

    this.snapshots.push(firstSnapshot);

    return firstSnapshot;
  }

  public iterate() {
    this.currentIteration++;

    // 1. Avança as filas
    let numerosChamados = [];
    for (let i = 0; i < 2; i++) {
      numerosChamados.push(
        this.queuesController.callNextNumber(this.konfig.abandonChance),
      );
    }

    // 2. TODO adicionar pessoas nas cabines
    // 3. TODO abrir/fechar cabines
    // 4. TODO finalizar atendimento nas cabines

    // 5. Adiciona pessoas na fila
    let peopleEntering = 0;
    while (generateRandomness(this.konfig.newNumberChance)) {
      this.queuesController.addNumber(this.konfig.priorityChance);
      peopleEntering++;
    }

    // 6. Cria snapshot da iteração final
    const newSnapshot: SnapshotType = {
      normalQueue: this.queuesController.getNormalQueue().toArray(),
      priorityQueue: this.queuesController.getPriorityQueue().toArray(),
      booths: [{}, {}, {}],
      stack: [],
      nextTwo: this.queuesController.peekTwo(),
      abandonCounter: this.queuesController.getAbandonCounter(),
      iteration: this.currentIteration,
    };

    this.snapshots.push(newSnapshot);

    if (this.konfig.conditionToEnd(this.currentIteration))
      this.isFinished = true;

    return newSnapshot;
  }

  public stop(): SnapshotType[] {
    return this.snapshots;
  }
}
