import { generateRandomness } from "../utils";
import { Queue } from "./Queue";
import { Stack } from "./Stack";

export class QueuesController {
  private attended: Stack<number>;
  private normal: Queue<number>;
  private priority: Queue<number>;
  private nextNumber: number;
  private priorityCounter: number;
  private abandonCounter: number;

  constructor() {
    this.attended = new Stack<number>();
    this.normal = new Queue<number>();
    this.priority = new Queue<number>();
    this.priorityCounter = 1;
    this.nextNumber = 1;
    this.abandonCounter = 0;
  }

  public getNormalQueue() {
    return this.normal;
  }

  public getPriorityQueue() {
    return this.priority;
  }

  public getAttendedStack() {
    return this.attended;
  }

  public getAbandonCounter() {
    return this.abandonCounter;
  }

  public addNumber(priorityChance: number) {
    if (generateRandomness(priorityChance)) {
      return this.priority.enqueue(this.nextNumber++);
    }

    this.normal.enqueue(this.nextNumber++);
  }

  public callNextNumber(abandonChance: number): number | undefined {
  if (!this.canCallNumber()) return undefined;

  const isPriority = this.priorityCounter % 3 === 0;
  let numberToCall: number | undefined;

  if (isPriority) {
    if (!this.priority.isEmpty())
      numberToCall = this.priority.dequeue();
    else
      numberToCall = this.normal.dequeue();
  } else {
    numberToCall = this.normal.dequeue();
  }

  this.priorityCounter++;
  if (numberToCall !== undefined && generateRandomness(abandonChance)) {
    this.abandonCounter++;
    return this.callNextNumber(abandonChance);
  }

  return numberToCall;
}

  public finishAttendance(finished: number) {
    this.attended.push(finished);
  }

  public canCallNumber(): boolean {
    return !this.normal.isEmpty() || !this.priority.isEmpty();
  }

  public peekTwo(): (number | undefined)[] {
    // Verifica se o primeiro ou o segundo são prioridade
    const isPriorityFirst = this.priorityCounter % 3 === 0;
    const isPrioritySecond = (this.priorityCounter + 1) % 3 === 0;
    const areBothNotPriority = !isPriorityFirst && !isPrioritySecond;

    // Pega o primeiro da fila de prioridade e os dois primeiros da fila normal
    const priorityPeek = this.priority.peek();
    const normalPeek = this.normal.peek();
    const normalPeekSecond = this.normal.peekSecond();

    // Determina quem deve ser chamado
    const firstNumber = isPriorityFirst ? priorityPeek : normalPeek;
    const secondNumber = areBothNotPriority
      ? normalPeekSecond
      : isPrioritySecond
        ? priorityPeek
        : normalPeek;

    return [firstNumber, secondNumber];
  }
}
