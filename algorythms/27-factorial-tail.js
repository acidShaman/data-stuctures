// How many zeroes are at the end of the factorial of 10? 10! = 3628800, i.e. there are 2 zeroes. 16! (or 0x10!) in hexadecimal would be 0x130777758000, which has 3 zeroes.

// Scalability
// Unfortunately, machine integer numbers has not enough precision for larger values. Floating point numbers drop the tail we need. We can fall back to arbitrary-precision ones - built-ins or from a library, but calculating the full product isn't an efficient way to find just the tail of a factorial. Calculating 100'000! in compiled language takes around 10 seconds. 1'000'000! would be around 10 minutes, even using efficient Karatsuba algorithm

// Your task
// is to write a function, which will find the number of zeroes at the end of (number) factorial in arbitrary radix = base for larger numbers.

// base is an integer from 2 to 256
// number is an integer from 1 to 1'000'000
// Note Second argument: number is always declared, passed and displayed as a regular decimal number. If you see a test described as 42! in base 20 it's 4210 not 4220 = 8210.

function zeroes(base, number) {
    // Function to find the prime factorization of a given number
    function primeFactorize(num) {
        const factors = {};
        let divisor = 2;
        while (num >= 2) {
            while (num % divisor === 0) {
                if (!factors[divisor]) factors[divisor] = 0;
                factors[divisor]++;
                num /= divisor;
            }
            divisor++;
        }
        return factors;
    }

    // Function to calculate the number of times a prime factor is in the factorial
    function countFactorsInFactorial(n, prime) {
        let count = 0;
        while (n > 0) {
            n = Math.floor(n / prime);
            count += n;
        }
        return count;
    }

    // Step 1: Get the prime factorization of the base
    const baseFactors = primeFactorize(base);

    // Step 2: For each prime factor, determine how many times it appears in the factorial of the number
    let minZeroes = Infinity;
    for (const [prime, exponent] of Object.entries(baseFactors)) {
        const primeCountInFactorial = countFactorsInFactorial(number, Number(prime));
        const zeroesForThisFactor = Math.floor(primeCountInFactorial / exponent);
        minZeroes = Math.min(minZeroes, zeroesForThisFactor);
    }

    // Return the minimum number of trailing zeroes
    return minZeroes;
}

// Example usage:
console.log(zeroes(10, 100)); // Output will be the number of trailing zeroes in 100! in base 10
console.log(zeroes(16, 100)); // Output will be the number of trailing zeroes in 100! in base 16
