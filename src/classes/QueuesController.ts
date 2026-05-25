import { Queue } from "./Queue";
import { Stack } from "./Stack";

const ABANDON_CHANCE = 0.1;
const PRIORITY_CHANCE = 0.2;

const random = (randomChance: number): boolean => {
  return Math.random() < randomChance;
};

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

  public addNumber() {
    if (random(PRIORITY_CHANCE)) {
      return this.priority.enqueue(this.nextNumber++);
    }

    this.normal.enqueue(this.nextNumber++);
  }

  public callNextNumber(): number | undefined {
    const isPriority = this.priorityCounter % 3 === 0;

    let numberToCall: number | undefined;

    if (isPriority) {
      numberToCall = this.priority.dequeue();
    } else {
      numberToCall = this.normal.dequeue();
    }

    if (!numberToCall) {
      // TODO o que fazer quando a fila está vazia?
      return;
    }

    if (random(ABANDON_CHANCE)) {
      this.abandonCounter++;
      return this.callNextNumber();
    }

    this.priorityCounter++;

    return numberToCall;
  }

  public finishAttendance(finished: number) {
    this.attended.push(finished);
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
