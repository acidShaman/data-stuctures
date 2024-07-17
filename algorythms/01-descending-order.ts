//Your task is to make a function that can take any non-negative integer as an argument and return it with its digits in descending order. Essentially, rearrange the digits to create the highest possible number.

// Examples:
// Input: 42145 Output: 54421
// Input: 145263 Output: 654321
// Input: 123456789 Output: 987654321

export function descendingOrder(n: number): number {
    // Convert the number to a string, then to an array of characters
    let digitsArray = n.toString().split('');

    // Sort the array in descending order
    digitsArray.sort((a, b) => parseInt(b) - parseInt(a));

    // Join the array back into a string and convert it to a number
    let sortedNumber = parseInt(digitsArray.join(''));

    return sortedNumber;
}

// Example usage:
console.log(descendingOrder(42145)); // Output: 54421
console.log(descendingOrder(145263)); // Output: 654321
console.log(descendingOrder(123456789)); // Output: 987654321
