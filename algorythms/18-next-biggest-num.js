// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:

//   12 ==> 21
//  513 ==> 531
// 2017 ==> 2071
// If the digits can't be rearranged to form a bigger number, return -1:

//   9 ==> -1
// 111 ==> -1
// 531 ==> -1

function nextBigger(n) {
    let digits = n.toString().split('');

    // Step 1: Identify the pivot
    let i = digits.length - 2;
    while (i >= 0 && digits[i] >= digits[i + 1]) {
        i--;
    }

    // If no pivot is found, return -1
    if (i < 0) return -1;

    // Step 2: Find the smallest digit on the right of the pivot that is larger than the pivot
    let j = digits.length - 1;
    while (digits[j] <= digits[i]) {
        j--;
    }

    // Step 3: Swap the pivot with this digit
    [digits[i], digits[j]] = [digits[j], digits[i]];

    // Step 4: Sort the digits to the right of the pivot
    let left = digits.slice(0, i + 1);
    let right = digits.slice(i + 1).sort((a, b) => a - b);

    // Concatenate and convert back to number
    let result = parseInt(left.concat(right).join(''), 10);

    return result;
}

// Example usage:
console.log(nextBigger(12));    // Output: 21
console.log(nextBigger(513));   // Output: 531
console.log(nextBigger(2017));  // Output: 2071
console.log(nextBigger(9));     // Output: -1
console.log(nextBigger(111));   // Output: -1
console.log(nextBigger(531));   // Output: -1
