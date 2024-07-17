// Some numbers have funny properties. For example:

// 89 --> 8¹ + 9² = 89 * 1
// 695 --> 6² + 9³ + 5⁴= 1390 = 695 * 2
// 46288 --> 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51
// Given two positive integers n and p, we want to find a positive integer k, if it exists, such that the sum of the digits of n raised to consecutive powers starting from p is equal to k * n.

// In other words, writing the consecutive digits of n as a, b, c, d ..., is there an integer k such that :

// (
// 𝑎
// 𝑝
// +
// 𝑏
// 𝑝
// +
// 1
// +
// 𝑐
// 𝑝
// +
// 2
// +
// 𝑑
// 𝑝
// +
// 3
// +
// .
// .
// .
// )
// =
// 𝑛
// ∗
// 𝑘
// (a 
// p
//  +b 
// p+1
//  +c 
// p+2
//  +d 
// p+3
//  +...)=n∗k
// If it is the case we will return k, if not return -1.

// Note: n and p will always be strictly positive integers.

// Examples:
// n = 89; p = 1 ---> 1 since 8¹ + 9² = 89 = 89 * 1

// n = 92; p = 1 ---> -1 since there is no k such that 9¹ + 2² equals 92 * k

// n = 695; p = 2 ---> 2 since 6² + 9³ + 5⁴= 1390 = 695 * 2

// n = 46288; p = 3 ---> 51 since 4³ + 6⁴+ 2⁵ + 8⁶ + 8⁷ = 2360688 = 46288 * 51

export class G964 {
    public static digPow = (n: number, p: number): number => {
        // Convert the number to a string to access each digit
        const digits = n.toString().split('').map(Number);
        
        // Calculate the sum of digits raised to consecutive powers
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            sum += Math.pow(digits[i], p + i);
        }

        // Check if the sum is a multiple of n
        const k = sum / n;
        return Number.isInteger(k) ? k : -1;
    }
}

// Example usage:
console.log(G964.digPow(89, 1)); // Output: 1
console.log(G964.digPow(92, 1)); // Output: -1
console.log(G964.digPow(695, 2)); // Output: 2
console.log(G964.digPow(46288, 3)); // Output: 51