// In this kata, your task is to create all permutations of a non-empty input string and remove duplicates, if present.

// Create as many "shufflings" as you can!

// Examples:

// With input 'a':
// Your function should return: ['a']

// With input 'ab':
// Your function should return ['ab', 'ba']

// With input 'abc':
// Your function should return ['abc','acb','bac','bca','cab','cba']

// With input 'aabb':
// Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
// Note: The order of the permutations doesn't matter.

// Good luck!

function permutations(string) {
    const result = new Set();

    function permute(arr, l, r) {
        if (l === r) {
            result.add(arr.join('')); 
        } else {
            for (let i = l; i <= r; i++) {
                swap(arr, l, i); 
                permute(arr, l + 1, r);
                swap(arr, l, i); 
            }
        }
    }

    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    permute(string.split(''), 0, string.length - 1);

    return Array.from(result); 
}

// Example usage:
console.log(permutations('a'));    // Output: ['a']
console.log(permutations('ab'));   // Output: ['ab', 'ba']
console.log(permutations('abc'));  // Output: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
console.log(permutations('aabb')); // Output: ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
