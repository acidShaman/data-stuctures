// Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations. For example, there are 3 ways to give change for 4 if you have coins with denomination 1 and 2:

// 1+1+1+1, 1+1+2, 2+2.
// The order of coins does not matter:

// 1+1+2 == 2+1+1
// Also, assume that you have an infinite amount of coins.

// Your function should take an amount to change and an array of unique denominations for the coins:

//   countChange(4, [1,2]) // => 3
//   countChange(10, [5,2,3]) // => 4
//   countChange(11, [5,7]) //  => 0

function countChange(amount, denominations) {
    // Initialize a DP array with zeros, with length amount + 1
    const dp = Array(amount + 1).fill(0);

    // There is exactly one way to make 0 amount, which is using no coins
    dp[0] = 1;

    // Iterate over each coin in the denominations array
    for (const coin of denominations) {
        // Update the DP array for all values from coin to amount
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    // Return the number of ways to make change for the amount
    return dp[amount];
}

// Example usage:
console.log(countChange(4, [1, 2]));      // Output: 3
console.log(countChange(10, [5, 2, 3]));  // Output: 4
console.log(countChange(11, [5, 7]));     // Output: 0
