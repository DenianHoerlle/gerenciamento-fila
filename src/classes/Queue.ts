import { Node } from "./Node";

export class Queue<T> {
    private front: Node<T> | null;
    private rear: Node<T> | null;
    private size: number;

    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueue(value: T): void {
        const newNode = new Node(value);

        if (this.rear === null) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.setNext(newNode);
            this.rear = newNode;
        }

        this.size++;
    }

    dequeue(): T | undefined {
        if (this.front === null) {
            return undefined;
        }

        const value = this.front.getValue();
        this.front = this.front.getNext();

        if (this.front === null) {
            this.rear = null;
        }

        this.size--;
        return value;
    }

    peek(): T | undefined {
        return this.front?.getValue();
    }

  peekSecond(): T | undefined {
    return this.front?.getNext()?.getValue();
  }

    getSize(): number {
        return this.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.front;

        while (current !== null) {
            result.push(current.getValue());
            current = current.getNext();
        }

        return result;
    }
}