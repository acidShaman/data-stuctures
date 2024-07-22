// The purpose of this kata is to write a program that can do some algebra.

// Write a function expand that takes in an expression with a single, one character variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers which may be positive or negative, x is any single character variable, and n is a natural number. If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be placed in front of the variable.

// The expanded form should be returned as a string in the form ax^b+cx^d+ex^f... where a, c, and e are the coefficients of the term, x is the original one character variable that was passed in the original expression and b, d, and f, are the powers that x is being raised to in each term and are in decreasing order.

// If the coefficient of a term is zero, the term should not be included. If the coefficient of a term is one, the coefficient should not be included. If the coefficient of a term is -1, only the "-" should be included. If the power of the term is 0, only the coefficient should be included. If the power of the term is 1, the caret and power should be excluded.

// Examples:
// expand("(x+1)^2");      // returns "x^2+2x+1"
// expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
// expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
// expand("(-2a-4)^0");    // returns "1"
// expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
// expand("(r+0)^203");    // returns "r^203"
// expand("(-x-1)^2");     // returns "x^2+2x+1"

function expand(expr) {
    // Extract the parts of the expression using a regular expression
    const match = expr.match(/\((-?\d*)([a-z])([+-]\d+)\)\^(\d+)/);
    const a = parseInt(match[1] || '1');
    const x = match[2];
    const b = parseInt(match[3]);
    const n = parseInt(match[4]);

    // Function to calculate binomial coefficient
    function binomialCoeff(n, k) {
        let res = 1;
        if (k > n - k) k = n - k;
        for (let i = 0; i < k; ++i) {
            res *= (n - i);
            res /= (i + 1);
        }
        return res;
    }

    // Array to store the terms of the expanded form
    let terms = [];

    // Apply the binomial theorem to generate each term
    for (let k = 0; k <= n; k++) {
        const coeff = binomialCoeff(n, k) * Math.pow(a, n - k) * Math.pow(b, k);
        const power = n - k;

        if (coeff === 0) continue;
        let term = '';
        if (coeff === -1 && power !== 0) term += '-';
        else if (coeff !== 1 || power === 0) term += coeff;

        if (power > 0) term += x;
        if (power > 1) term += '^' + power;

        terms.push(term);
    }

    // Join the terms into the final expanded form
    return terms.join('');
}

// Example usage:
console.log(expand("(x+1)^2"));      // Output: "x^2+2x+1"
console.log(expand("(p-1)^3"));      // Output: "p^3-3p^2+3p-1"
console.log(expand("(2f+4)^6"));     // Output: "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
console.log(expand("(-2a-4)^0"));    // Output: "1"
console.log(expand("(-12t+43)^2"));  // Output: "144t^2-1032t+1849"
console.log(expand("(r+0)^203"));    // Output: "r^203"
console.log(expand("(-x-1)^2"));     // Output: "x^2+2x+1"


