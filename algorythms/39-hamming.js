// A Hamming number is a positive integer of the form 2i3j5k, for some non-negative integers i, j, and k.

// Write a function that computes the nth smallest Hamming number.

// Specifically:

// The first smallest Hamming number is 1 = 203050
// The second smallest Hamming number is 2 = 213050
// The third smallest Hamming number is 3 = 203150
// The fourth smallest Hamming number is 4 = 223050
// The fifth smallest Hamming number is 5 = 203051
// The 20 smallest Hamming numbers are given in the Example test fixture.

// Your code should be able to compute the first 5 000 ( LC: 400, Clojure: 2 000, Haskell: 12 691, NASM, C, D, C++, Go and Rust: 13 282 ) Hamming numbers without timing out.

function hamming(n) {
    const heap = [1];
    const seen = new Set([1]);

    let number = 1;

    for (let i = 0; i < n; i++) {
        number = heap.shift();

        const nextNumbers = [number * 2, number * 3, number * 5];
        for (const next of nextNumbers) {
            if (!seen.has(next)) {
                seen.add(next);
                heap.push(next);
            }
        }

        heap.sort((a, b) => a - b);
    }

    return number;
}

// Example usage:
console.log(hamming(1)); 
console.log(hamming(2)); 
console.log(hamming(3)); 
console.log(hamming(4));
console.log(hamming(5)); 
console.log(hamming(20));
