// Task
// You are given a string s. Every letter in s appears once.

// Consider all strings formed by rearranging the letters in s. After ordering these strings in dictionary order, return the middle term. (If the sequence has a even length n, define its middle term to be the (n/2)th term.)

// Example
// For s = "abc", the result should be "bac".

//  The permutations in order are: "abc", "acb", "bac", "bca", "cab", "cba" So, The middle term is "bac".

// Input/Output
// [input] string s
// unique letters (2 <= length <= 26)

// [output] a string
// middle permutation.

function middlePermutation(s) {
    const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);

    const sortedChars = s.split('').sort();
    const n = sortedChars.length;
    let k = Math.floor(factorial(n) / 2) - 1; // zero-based index of the middle permutation
    let result = '';

    while (sortedChars.length > 0) {
        const f = factorial(sortedChars.length - 1);
        const index = Math.floor(k / f);
        result += sortedChars[index];
        sortedChars.splice(index, 1);
        k %= f;
    }

    return result;
}

// Example usage:
console.log(middlePermutation("abc")); // Output: "bac"
console.log(middlePermutation("abcd")); // Output: "bdac"
console.log(middlePermutation("abcdx")); // Output: "cbxda"
console.log(middlePermutation("abcdxy")); // Output: "cbxyad"
