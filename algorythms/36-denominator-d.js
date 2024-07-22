// If n is the numerator and d the denominator of a fraction, that fraction is defined a (reduced) proper fraction if and only if GCD(n,d)==1.

// For example 5/16 is a proper fraction, while 6/16 is not, as both 6 and 16 are divisible by 2, thus the fraction can be reduced to 3/8.

// Now, if you consider a given number d, how many proper fractions can be built using d as a denominator?

// For example, let's assume that d is 15: you can build a total of 8 different proper fractions between 0 and 1 with it: 1/15, 2/15, 4/15, 7/15, 8/15, 11/15, 13/15 and 14/15.

// You are to build a function that computes how many proper fractions you can build with a given denominator:

// properFractions(1)==0
// properFractions(2)==1
// properFractions(5)==4
// properFractions(15)==8
// properFractions(25)==20
// Be ready to handle big numbers.

// Edit: to be extra precise, the term should be "reduced" fractions, thanks to girianshiido for pointing this out and sorry for the use of an improper word :)
function properFractions(d) {
    if (d === 1) return 0;

    let result = d;
    let p = 2;

    // Find prime factors and apply the formula
    while (p * p <= d) {
        if (d % p === 0) {
            while (d % p === 0) {
                d = Math.floor(d / p);
            }
            result -= Math.floor(result / p);
        }
        p++;
    }

    // If d is still greater than 1, then it is a prime factor
    if (d > 1) {
        result -= Math.floor(result / d);
    }

    return result;
}

// Example usage:
console.log(properFractions(1)); // Output: 0
console.log(properFractions(2)); // Output: 1
console.log(properFractions(5)); // Output: 4
console.log(properFractions(15)); // Output: 8
console.log(properFractions(25)); // Output: 20

