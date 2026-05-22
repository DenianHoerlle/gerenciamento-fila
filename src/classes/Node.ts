export class Node<T> {
    private value: T;
    private next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }

    getNext(): Node<T> | null {
        return this.next;
    }
    
    setNext(next: Node<T> | null): void {
        this.next = next;
    }
}