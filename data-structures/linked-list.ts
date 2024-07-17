class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }

    // Add a new node at the end of the list
    append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Add a new node at the beginning of the list
    prepend(value: T): void {
        const newNode = new ListNode(value);
        if (this.head) {
            newNode.next = this.head;
        }
        this.head = newNode;
    }

    // Remove a node by value
    remove(value: T): void {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
        }
    }

    // Find a node by value
    find(value: T): ListNode<T> | null {
        let current = this.head;
        while (current && current.value !== value) {
            current = current.next;
        }
        return current;
    }

    // Print the list
    printList(): void {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.value + ' -> ';
            current = current.next;
        }
        result += 'null';
        console.log(result);
    }
}

// Usage example:
const list = new LinkedList<number>();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);
list.printList(); // Output: 5 -> 10 -> 20 -> 30 -> null
list.remove(20);
list.printList(); // Output: 5 -> 10 -> 30 -> null
const foundNode = list.find(10);
console.log(foundNode); // Output: ListNode { value: 10, next: ListNode { value: 30, next: null } }
