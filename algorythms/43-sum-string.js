// Given the string representations of two integers, return the string representation of the sum of those integers.

// For example:

// sumStrings('1','2') // => '3'
// A string representation of an integer will contain no characters besides the ten numerals "0" to "9".

// I have removed the use of BigInteger and BigDecimal in java

// Python: your solution need to work with huge numbers (about a milion digits), converting to int will not work.

function sumStrings(a, b) {
    // Remove leading zeros from the input strings
    a = a.replace(/^0+/, '');
    b = b.replace(/^0+/, '');

    // Make sure a is the longer string
    if (a.length < b.length) [a, b] = [b, a];

    // Pad the shorter string with zeros
    b = b.padStart(a.length, '0');

    let carry = 0;
    let result = [];

    // Add the numbers from the end (rightmost digits) to the start (leftmost digits)
    for (let i = a.length - 1; i >= 0; i--) {
        let sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    // If there's a carry left at the end, add it to the result
    if (carry > 0) {
        result.push(carry);
    }

    // The result array contains digits in reverse order, so reverse it
    result = result.reverse().join('');

    // Remove any leading zeros from the result
    return result.replace(/^0+/, '') || '0';
}

// Example usage:
console.log(sumStrings('1', '2'));           // Output: '3'
console.log(sumStrings('123', '456'));       // Output: '579'
console.log(sumStrings('123456789', '987654321')); // Output: '1111111110'
