import { Node } from "./Node";

export class CircularLinkedList<T> {
    private head: Node<T> | null;
    private current: Node<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.current = null;
        this.size = 0;
    }

    public add(value: T): void {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
            newNode.setNext(newNode);
            this.current = newNode;
            this.size++;
            return;
        }

        let last = this.head;
        while (last.getNext() !== this.head) {
            last = last.getNext()!;
        }

        last.setNext(newNode);
        newNode.setNext(this.head);
        this.size++;
    }

    public remove(value: T): T | null {
        if (this.head === null) {
            return null;
        }

        let last = this.head;
        while (last.getNext() !== this.head) {
            last = last.getNext()!;
        }

        let current = this.head;
        let previous: Node<T> | null = null;

        do {
            if (current.getValue() === value) {
                if (this.size === 1) {
                    this.head = null;
                    this.current = null;
                } else if (current === this.head) {
                    last.setNext(this.head.getNext()!);
                    this.head = this.head.getNext()!;
                    if (this.current === current) {
                        this.current = this.head;
                    }
                } else {
                    previous!.setNext(current.getNext()!);
                    if (this.current === current) {
                        this.current = current.getNext()!;
                    }
                }
                this.size--;
                return value;
            }
            previous = current;
            current = current.getNext()!;
        } while (current !== this.head);

        return null;
    }

    public getNext(): T | null {
        if (this.current === null) {
            return null;
        }

        const value = this.current.getValue();
        this.current = this.current.getNext()!;
        return value;
    }

    public getSize(): number {
        return this.size;
    }
    
    public isEmpty(): boolean {
        return this.size === 0;
    }

    public toArray(): T[] {
        if (this.head === null) {
            return [];
        }

        const result: T[] = [];
        let current = this.head;

        do {
            result.push(current.getValue());
            current = current.getNext()!;
        } while (current !== this.head);

        return result;
    }
}
