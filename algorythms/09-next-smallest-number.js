// Write a function that takes a positive integer and returns the next smaller positive integer containing the same digits.

// For example:

// nextSmaller(21) == 12
// nextSmaller(531) == 513
// nextSmaller(2071) == 2017
// Return -1 (for Haskell: return Nothing, for Rust: return None), when there is no smaller number that contains the same digits. Also return -1 when the next smaller number with the same digits would require the leading digit to be zero.

// nextSmaller(9) == -1
// nextSmaller(111) == -1
// nextSmaller(135) == -1
// nextSmaller(1027) == -1 // 0721 is out since we don't write numbers with leading zeros
// some tests will include very large numbers.
// test data only employs positive integers.
// The function you write for this challenge is the inverse of this kata: "Next bigger number with the same digits."

function nextSmaller(n) {
    let digits = n.toString().split('').map(Number);
    let length = digits.length;

    // Step 1: Find the first digit that is larger than the digit next to it when traversing from right to left.
    let i = length - 2;
    while (i >= 0 && digits[i] <= digits[i + 1]) {
        i--;
    }

    // If no such digit is found, return -1
    if (i < 0) {
        return -1;
    }

    // Step 2: Find the largest digit to the right of i that is smaller than digits[i]
    let j = length - 1;
    while (digits[j] >= digits[i]) {
        j--;
    }

    // Step 3: Swap digits[i] and digits[j]
    [digits[i], digits[j]] = [digits[j], digits[i]];

    // Step 4: Sort the digits after position i in descending order
    let left = digits.slice(0, i + 1);
    let right = digits.slice(i + 1).sort((a, b) => b - a);
    let resultDigits = left.concat(right);

    // Convert back to a number
    let result = parseInt(resultDigits.join(''), 10);

    // Check if the result has a leading zero
    if (result.toString().length !== digits.length) {
        return -1;
    }

    return result;
}

// Example usage:
console.log(nextSmaller(21)); // Output: 12
console.log(nextSmaller(531)); // Output: 513
console.log(nextSmaller(2071)); // Output: 2017
console.log(nextSmaller(9)); // Output: -1
console.log(nextSmaller(111)); // Output: -1
console.log(nextSmaller(135)); // Output: -1
console.log(nextSmaller(1027)); // Output: -1