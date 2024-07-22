// There is a secret string which is unknown to you. Given a collection of random triplets from the string, recover the original string.
// A triplet here is defined as a sequence of three letters such that each letter occurs somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".
// As a simplification, you may assume that no letter occurs more than once in the secret string.
// You can assume nothing about the triplets given to you other than that they are valid triplets and that they contain sufficient information to deduce the original string. In particular, this means that the secret string will never contain letters that do not occur in one of the triplets given to you.

var recoverSecret = function (triplets) {
    // Step 1: Build the graph and in-degree count
    let graph = {};
    let inDegree = {};

    // Initialize the graph
    for (let [a, b, c] of triplets) {
        if (!graph[a]) graph[a] = new Set();
        if (!graph[b]) graph[b] = new Set();
        if (!graph[c]) graph[c] = new Set();

        if (!inDegree[a]) inDegree[a] = 0;
        if (!inDegree[b]) inDegree[b] = 0;
        if (!inDegree[c]) inDegree[c] = 0;
    }

    // Build the graph and calculate in-degrees
    for (let [a, b, c] of triplets) {
        if (!graph[a].has(b)) {
            graph[a].add(b);
            inDegree[b]++;
        }
        if (!graph[b].has(c)) {
            graph[b].add(c);
            inDegree[c]++;
        }
    }

    // Step 2: Perform topological sort
    let queue = [];
    for (let node in inDegree) {
        if (inDegree[node] === 0) queue.push(node);
    }

    let sortedOrder = [];
    while (queue.length) {
        let node = queue.shift();
        sortedOrder.push(node);

        for (let neighbor of graph[node] || []) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return sortedOrder.join('');
};

// Example usage:
console.log(recoverSecret([['w', 'h', 'i'], ['h', 'a', 't'], ['a', 's', 'u'], ['s', 'u', 'p']])); // "whatisup"
