// Given an array of positive or negative integers

//  I= [i1,..,in]

// you have to produce a sorted array P of the form

// [ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]

// P will be sorted by increasing order of the prime numbers. The final result has to be given as a string in Java, C#, C, C++ and as an array of arrays in other languages.

// Example:
// I = [12, 15]; //result = [[2, 12], [3, 27], [5, 15]]
// [2, 3, 5] is the list of all prime factors of the elements of I, hence the result.

// Notes:

// It can happen that a sum is 0 if some numbers are negative!
// Example: I = [15, 30, -45] 5 divides 15, 30 and (-45) so 5 appears in the result, the sum of the numbers for which 5 is a factor is 0 so we have [5, 0] in the result amongst others.

// In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

function sumOfDivided(lst) {
    // Function to generate primes up to a given limit using the Sieve of Eratosthenes
    function generatePrimes(limit) {
        const sieve = new Array(limit + 1).fill(true);
        sieve[0] = sieve[1] = false;
        for (let start = 2; start * start <= limit; start++) {
            if (sieve[start]) {
                for (let multiple = start * start; multiple <= limit; multiple += start) {
                    sieve[multiple] = false;
                }
            }
        }
        return sieve
            .map((isPrime, num) => (isPrime ? num : null))
            .filter(Boolean);
    }

    // Function to get prime factors of a number
    function primeFactors(n, primes) {
        const factors = new Set();
        for (let prime of primes) {
            if (prime * prime > Math.abs(n)) break;
            if (n % prime === 0) {
                factors.add(prime);
                while (n % prime === 0) {
                    n /= prime;
                }
            }
        }
        if (Math.abs(n) > 1) {
            factors.add(Math.abs(n));
        }
        return factors;
    }

    // Find the maximum absolute value in the list
    const maxAbsValue = Math.max(...lst.map(Math.abs));

    // Generate all primes up to the maximum absolute value
    const primes = generatePrimes(maxAbsValue);

    // Object to store the sum of numbers for each prime factor
    const primeSum = {};

    // Calculate the sum of numbers for each prime factor
    for (let num of lst) {
        const factors = primeFactors(num, primes);
        for (let factor of factors) {
            if (!(factor in primeSum)) {
                primeSum[factor] = 0;
            }
            primeSum[factor] += num;
        }
    }

    // Convert the primeSum object to the desired output format and sort by prime number
    const result = Object.entries(primeSum).map(([prime, sum]) => [parseInt(prime), sum]);
    result.sort((a, b) => a[0] - b[0]);

    return result;
}

// Example usage:
console.log(sumOfDivided([12, 15])); // Output: [[2, 12], [3, 27], [5, 15]]
console.log(sumOfDivided([15, 30, -45])); // Output: [[2, 30], [3, 0], [5, 0]]
