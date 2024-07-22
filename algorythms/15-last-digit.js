// For a given list [x1, x2, x3, ..., xn] compute the last (decimal) digit of x1 ^ (x2 ^ (x3 ^ (... ^ xn))).
// E. g., with the input [3, 4, 2], your code should return 1 because 3 ^ (4 ^ 2) = 3 ^ 16 = 43046721.
// Beware: powers grow incredibly fast. For example, 9 ^ (9 ^ 9) has more than 369 millions of digits. lastDigit has to deal with such numbers efficiently.
// Corner cases: we assume that 0 ^ 0 = 1 and that lastDigit of an empty list equals to 1.
// This kata generalizes Last digit of a large number; you may find useful to solve it beforehand.

function lastDigit(as) {
    if (as.length === 0) return 1;

    const modCycle = (base, exp) => {
        if (base === 0) return 0;
        if (exp === 0) return 1;
        const cycle = [base % 10];
        let next = (cycle[0] * cycle[0]) % 10;
        while (next !== cycle[0]) {
            cycle.push(next);
            next = (next * cycle[0]) % 10;
        }
        const cycleLength = cycle.length;
        const reducedExp = exp % cycleLength || cycleLength;
        return cycle[reducedExp - 1];
    };

    let exp = 1;
    for (let i = as.length - 1; i >= 0; i--) {
        exp = modCycle(as[i], exp);
    }

    return exp;
}

// Example usage:
console.log(lastDigit([3, 4, 2]));    // Output: 1
console.log(lastDigit([12, 30, 21])); // Output: 6
console.log(lastDigit([7, 6, 21]));   // Output: 3
console.log(lastDigit([]));           // Output: 1
console.log(lastDigit([0, 0]));       // Output: 1
console.log(lastDigit([2, 2, 2, 0])); // Output: 1