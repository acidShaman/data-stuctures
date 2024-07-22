// How many ways can you make the sum of a number?
// From wikipedia: https://en.wikipedia.org/wiki/Partition_(number_theory)

// In number theory and combinatorics, a partition of a positive integer n, also called an integer partition, is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their summands are considered the same partition. If order matters, the sum becomes a composition. For example, 4 can be partitioned in five distinct ways:

// 4
// 3 + 1
// 2 + 2
// 2 + 1 + 1
// 1 + 1 + 1 + 1
// Examples
// Basic
// sum(1) // 1
// sum(2) // 2  -> 1+1 , 2
// sum(3) // 3 -> 1+1+1, 1+2, 3
// sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
// sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3

// sum(10) // 42
// Explosive
// sum(50) // 204226
// sum(80) // 15796476
// sum(100) // 190569292

function sum(n) {
    // Initialize the dp array with 0's, with dp[0] set to 1
    let dp = Array(n + 1).fill(0);
    dp[0] = 1;

    // Fill the dp table
    for (let i = 1; i <= n; i++) {
        for (let j = i; j <= n; j++) {
            dp[j] += dp[j - i];
        }
    }

    return dp[n];
}

// Example usage:
console.log(sum(1)); // Output: 1
console.log(sum(2)); // Output: 2
console.log(sum(3)); // Output: 3
console.log(sum(4)); // Output: 5
console.log(sum(5)); // Output: 7
console.log(sum(10)); // Output: 42
console.log(sum(50)); // Output: 204226
console.log(sum(80)); // Output: 15796476
console.log(sum(100)); // Output: 190569292
