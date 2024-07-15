class ListNode<T> {
    value: T;
    both: number; // XOR of next and previous node addresses

    constructor(value: T) {
        this.value = value;
        this.both = 0;
    }
}

class XORLinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private nodes: Map<number, ListNode<T>> = new Map(); // Memory address simulator
    private counter: number = 0; // Simulate memory address

    private getPointer(node: ListNode<T> | null): number {
        if (node === null) return 0;
        for (let [address, storedNode] of this.nodes.entries()) {
            if (storedNode === node) return address;
        }
        return 0;
    }

    private dereferencePointer(address: number): ListNode<T> | null {
        return this.nodes.get(address) || null;
    }

    add(value: T): void {
        const newNode = new ListNode(value);
        const newNodeAddress = ++this.counter;
        this.nodes.set(newNodeAddress, newNode);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            const tailPointer = this.getPointer(this.tail);
            newNode.both = tailPointer;
            if (this.tail) {
                this.tail.both = this.tail.both ^ newNodeAddress;
            }
            this.tail = newNode;
        }
    }

    get(index: number): T | null {
        let current = this.head;
        let previousAddress = 0;
        let currentIndex = 0;

        while (current !== null && currentIndex < index) {
            const nextAddress = previousAddress ^ current.both;
            previousAddress = this.getPointer(current);
            current = this.dereferencePointer(nextAddress);
            currentIndex++;
        }

        return current ? current.value : null;
    }

    printList(): void {
        let current = this.head;
        let previousAddress = 0;
        const result: T[] = [];

        while (current !== null) {
            result.push(current.value);
            const nextAddress = previousAddress ^ current.both;
            previousAddress = this.getPointer(current);
            current = this.dereferencePointer(nextAddress);
        }

        console.log(result.join(' -> '));
    }
}

// Usage example:
const xorLinkedList = new XORLinkedList<number>();
xorLinkedList.add(10);
xorLinkedList.add(20);
xorLinkedList.add(30);
xorLinkedList.add(40);

xorLinkedList.printList(); // Output: 10 -> 20 -> 30 -> 40

console.log(xorLinkedList.get(0)); // Output: 10
console.log(xorLinkedList.get(2)); // Output: 30
console.log(xorLinkedList.get(3)); // Output: 40
console.log(xorLinkedList.get(4)); // Output: null
