import { generateNumberFromInterval, generateRandomness } from "../utils";
import { BoothController } from "./BoothController";
import type { Konfig } from "./konfigs/Konfig";
import { QueuesController } from "./QueuesController";
import { type SnapshotType } from "./Snapshot";

export class SimulationController {
  private snapshots: SnapshotType[];
  private queuesController: QueuesController;
  private booths: BoothController<number>;
  private konfig!: Konfig;
  private currentIteration: number;
  private isFinished: boolean = false;

  constructor(konfig: Konfig) {
    this.konfig = konfig;
    this.currentIteration = 0;
    this.snapshots = [];
    this.queuesController = new QueuesController();
    this.booths = new BoothController(this.konfig.initialBoothAmount);
  }

  public start(): SnapshotType {
    const firstSnapshot: SnapshotType = {
      normalQueue: [],
      priorityQueue: [],
      booths: this.booths.getCurrentBoothsState(),
      stack: [],
      nextTwo: [undefined, undefined],
      abandonCounter: 0,
      iteration: 0,
    };

    this.snapshots.push(firstSnapshot);

    return firstSnapshot;
  }

  public iterate() {
    this.currentIteration++;

    // // 1. Avança as filas
    let numbersCalled = [];

    let hasCabinsOpen = !this.booths.isFull();
    let hasNextNumber = this.queuesController.canCallNumber();

    while (hasCabinsOpen && hasNextNumber) {
      const numberCalled = this.queuesController.callNextNumber(
        this.konfig.abandonChance,
      );

      if (!numberCalled) break;

      hasCabinsOpen = this.booths.getOpenAmount() > numbersCalled.length;
      hasNextNumber = this.queuesController.canCallNumber();

      numbersCalled.push(numberCalled);
    }

    // 2. Avança atendimentos das cabines
    this.booths.iterate();

    // 2. Adiciona pessoas nas cabines
    for (const newNumber of numbersCalled) {
      if (!newNumber) continue;

      const duration = generateNumberFromInterval(
        this.konfig.minDuration,
        this.konfig.maxDuration,
      );
      this.booths.receiveNumber(newNumber, duration);
    }

    // 4. Remove quem finalizou o atendimento
    const finishedNumbers = this.booths.finishAttendance();
    for (const finishedNumber of finishedNumbers)
      this.queuesController.finishAttendance(finishedNumber);
    //

    // 5. Adiciona novas pessoas na fila
    let peopleEntering = 0;
    for (let i = 0; i < this.konfig.maxNewNumberPerIteration; i++) {
      // Garante que o mínimo vai ser adicionado
      if (i < this.konfig.minNewNumberPerIteration) {
        peopleEntering++;
        this.queuesController.addNumber(this.konfig.priorityChance);
      } else {
        // Sorteia se estiver no range
        if (generateRandomness(this.konfig.newNumberChance)) {
          peopleEntering++;
          this.queuesController.addNumber(this.konfig.priorityChance);
        }
      }
    }

    // 6. Cria snapshot da iteração final
    const newSnapshot: SnapshotType = {
      normalQueue: this.queuesController.getNormalQueue().toArray(),
      priorityQueue: this.queuesController.getPriorityQueue().toArray(),
      booths: this.booths.getCurrentBoothsState(),
      stack: this.queuesController.getAttendedStack().toArray(),
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

  public getIsFinished(): boolean {
    return this.isFinished;
  }
}
