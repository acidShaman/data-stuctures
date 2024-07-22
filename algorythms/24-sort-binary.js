// You are given a binary tree:

// class Node { 
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left  = left;
//     this.right = right;
//   }
// }
// Your task is to return the list with elements from tree sorted by levels, which means the root element goes first, then root children (from left to right) are second and third, and so on.

// Return empty array if root is null.

// Example 1 - following tree:

//                  2
//             8        9
//           1  3     4   5
// Should return following list:

// [2,8,9,1,3,4,5]
// Example 2 - following tree:

//                  1
//             8        4
//               3        5
//                          7
// Should return following list:

// [1,8,4,3,5,7]

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function treeByLevels(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.value);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return result;
}

// Example usage:

// Example 1:
let tree1 = new Node(2, new Node(8, new Node(1), new Node(3)), new Node(9, new Node(4), new Node(5)));
console.log(treeByLevels(tree1)); // Output: [2, 8, 9, 1, 3, 4, 5]

// Example 2:
let tree2 = new Node(1, new Node(8, null, new Node(3)), new Node(4, null, new Node(5, null, new Node(7))));
console.log(treeByLevels(tree2)); // Output: [1, 8, 4, 3, 5, 7]

