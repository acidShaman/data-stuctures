class HashTable<K, V> {
    private table: { [key: string]: V } = {};

    set(key: K, value: V): void {
        const hash = this.hash(key);
        this.table[hash] = value;
    }

    get(key: K): V | undefined {
        const hash = this.hash(key);
        return this.table[hash];
    }

    remove(key: K): void {
        const hash = this.hash(key);
        delete this.table[hash];
    }

    private hash(key: K): string {
        let hash = 5381;
        const strKey = String(key);
        for (let i = 0; i < strKey.length; i++) {
            hash = (hash * 33) ^ strKey.charCodeAt(i);
        }
        return hash.toString();
    }

    printTable(): void {
        console.log(this.table);
    }
}

// Usage example:
const hashTable = new HashTable<string, number>();
hashTable.set('one', 1);
hashTable.set('two', 2);
console.log(hashTable.get('one')); // Output: 1
hashTable.remove('one');
hashTable.printTable(); // Output: { "two": 2 }
