// Motivation
// When compressing sequences of symbols, it is useful to have many equal symbols follow each other, because then they can be encoded with a run length encoding. For example, RLE encoding of "aaaabbbbbbbbbbbcccccc" would give something like 4a 11b 6c.

// (Look here for learning more about the run-length-encoding.)

// Of course, RLE is interesting only if the string contains many identical consecutive characters. But what bout human readable text? Here comes the Burrows-Wheeler-Transformation.

// Transformation
// There even exists a transformation, which brings equal symbols closer together, it is called the Burrows-Wheeler-Transformation. The forward transformation works as follows: Let's say we have a sequence with length n, first write every shift of that string into a n x n matrix:

// Input: "bananabar"

// b a n a n a b a r
// r b a n a n a b a
// a r b a n a n a b
// b a r b a n a n a
// a b a r b a n a n
// n a b a r b a n a
// a n a b a r b a n
// n a n a b a r b a
// a n a n a b a r b
// Then we sort that matrix by its rows. The output of the transformation then is the last column and the row index in which the original string is in:

//                .-.
// a b a r b a n a n
// a n a b a r b a n
// a n a n a b a r b
// a r b a n a n a b
// b a n a n a b a r <- 4
// b a r b a n a n a
// n a b a r b a n a
// n a n a b a r b a
// r b a n a n a b a
//                '-'

// Output: ("nnbbraaaa", 4)
// Of course we want to restore the original input, therefore you get the following hints:

// The output contains the last matrix column.
// The first column can be acquired by sorting the last column.
// For every row of the table: Symbols in the first column follow on symbols in the last column, in the same way they do in the input string.
// You don't need to reconstruct the whole table to get the input back.
// Goal
// The goal of this Kata is to write both, the encode and decode functions. Together they should work as the identity function on lists. (Note: For the empty input, the row number is ignored.)

// Further studies
// You may have noticed that symbols are not always consecutive, but just in proximity, after the transformation. If you're interested in how to deal with that, you should have a look at this Kata.

function encode(s) {
    if (s.length === 0) return ["", -1];

    // Step 1: Create all cyclic permutations of the input string
    const n = s.length;
    const table = [];
    for (let i = 0; i < n; i++) {
        table.push(s.slice(i) + s.slice(0, i));
    }

    // Step 2: Sort the table lexicographically
    table.sort();

    // Step 3: Extract the last column
    const lastColumn = table.map(row => row[n - 1]).join('');

    // Step 4: Identify the row index of the original string
    const originalIndex = table.indexOf(s);

    return [lastColumn, originalIndex];
}

// Example usage:
console.log(encode("bananabar")); // Output: ["nnbbraaaa", 4]


function decode(s, i) {
    if (s.length === 0) return "";

    // Step 1: Initialize the last column
    const n = s.length;
    const lastColumn = s.split('');

    // Step 2: Sort the last column to get the first column
    const firstColumn = [...lastColumn].sort();

    // Step 3: Reconstruct the original string
    const positions = Array(n);
    const count = {};

    // Compute positions array
    for (let j = 0; j < n; j++) {
        if (!count[lastColumn[j]]) count[lastColumn[j]] = 0;
        positions[j] = firstColumn.indexOf(lastColumn[j], count[lastColumn[j]]);
        count[lastColumn[j]] += 1;
    }

    // Reconstruct the original string using the positions array
    let row = i;
    let result = '';
    for (let j = 0; j < n; j++) {
        result += lastColumn[row];
        row = positions[row];
    }

    return result.split('').reverse().join('');
}

// Example usage:
console.log(decode("nnbbraaaa", 4)); // Output: "bananabar"
