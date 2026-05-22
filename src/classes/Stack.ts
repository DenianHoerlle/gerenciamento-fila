import { Node } from "./Node";

export class Stack<T> {
    private head: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null; 
        this.size = 0; 
    }

    push(value: T): void {
        const newNode = new Node(value);
        newNode.setNext(this.head); 
        this.head = newNode; 
        this.size++ 
    }

    pop(): T | undefined {
        if (this.head === null) {
            return undefined; 
        }

        const value = this.head.getValue();
        this.head = this.head.getNext();
        this.size--;
        return value;
    }

    peek(): T | undefined {
        return this.head?.getValue();
    }

    getSize(): number {
        return this.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;

        while (current !== null) {
            result.push(current.getValue());
            current = current.getNext();
        }

        return result;
    }
}