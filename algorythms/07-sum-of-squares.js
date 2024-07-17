// The task is simply stated. Given an integer n (3 < n < 109), find the length of the smallest list of perfect squares which add up to n. Come up with the best algorithm you can; you'll need it!

// Examples:

// sum_of_squares(17) = 2
// 17 = 16 + 1 (16 and 1 are perfect squares).
// sum_of_squares(15) = 4
// 15 = 9 + 4 + 1 + 1. There is no way to represent 15 as the sum of three perfect squares.
// sum_of_squares(16) = 1
// 16 itself is a perfect square.
// Time constraints:

// 5 easy (sample) test cases: n < 20

// 5 harder test cases: 1000 < n < 15000

// 5 maximally hard test cases: 5e8 < n < 1e9

// 100 random maximally hard test cases: 1e8 < n < 1e9

function sumOfSquares(n) {
    if (n <= 3) return n; // Base case for very small values of n

    // Initialize the dp array with Infinity for all indices
    const dp = Array(n + 1).fill(Infinity);
    dp[0] = 0; // Zero perfect squares needed to sum up to 0

    // Precompute all perfect squares less than or equal to n
    const perfectSquares = [];
    for (let i = 1; i * i <= n; i++) {
        perfectSquares.push(i * i);
    }

    // Dynamic programming to fill the dp array
    for (let i = 1; i <= n; i++) {
        for (const square of perfectSquares) {
            if (i < square) break;
            dp[i] = Math.min(dp[i], dp[i - square] + 1);
        }
    }

    return dp[n];
}

// Example usage:
console.log(sumOfSquares(17)); // Output: 2 (16 + 1)
console.log(sumOfSquares(15)); // Output: 4 (9 + 4 + 1 + 1)
console.log(sumOfSquares(19)); // Output: 1 (16)