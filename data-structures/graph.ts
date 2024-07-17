class Graph {
    private adjacencyList: Map<string, string[]> = new Map();

    addVertex(vertex: string): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: string, vertex2: string): void {
        this.adjacencyList.get(vertex1)?.push(vertex2);
        this.adjacencyList.get(vertex2)?.push(vertex1);
    }

    printGraph(): void {
        for (let [vertex, edges] of this.adjacencyList.entries()) {
            console.log(`${vertex} -> ${edges.join(', ')}`);
        }
    }
}

// Usage example:
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.printGraph(); // Output: A -> B, C | B -> A, C | C -> A, B
