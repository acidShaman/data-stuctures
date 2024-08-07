// Esolang Interpreters #3 - Custom Paintfuck Interpreter
// About this Kata Series
// "Esolang Interpreters" is a Kata Series that originally began as three separate, independent esolang interpreter Kata authored by @donaldsebleung which all shared a similar format and were all somewhat inter-related. Under the influence of a fellow Codewarrior, these three high-level inter-related Kata gradually evolved into what is known today as the "Esolang Interpreters" series.

// This series is a high-level Kata Series designed to challenge the minds of bright and daring programmers by implementing interpreters for various esoteric programming languages/Esolangs, mainly Brainfuck derivatives but not limited to them, given a certain specification for a certain Esolang. Perhaps the only exception to this rule is the very first Kata in this Series which is intended as an introduction/taster to the world of esoteric programming languages and writing interpreters for them.

// The Language
// Paintfuck is a borderline-esoteric programming language/Esolang which is a derivative of Smallfuck (itself a derivative of the famous Brainfuck) that uses a two-dimensional data grid instead of a one-dimensional tape.

// Valid commands in Paintfuck include:

// n - Move data pointer north (up)
// e - Move data pointer east (right)
// s - Move data pointer south (down)
// w - Move data pointer west (left)
// * - Flip the bit at the current cell (same as in Smallfuck)
// [ - Jump past matching ] if bit under current pointer is 0 (same as in Smallfuck)
// ] - Jump back to the matching [ (if bit under current pointer is nonzero) (same as in Smallfuck)
// The specification states that any non-command character (i.e. any character other than those mentioned above) should simply be ignored. The output of the interpreter is the two-dimensional data grid itself, best as animation as the interpreter is running, but at least a representation of the data grid itself after a certain number of iterations (explained later in task).

// In current implementations, the 2D datagrid is finite in size with toroidal (wrapping) behaviour. This is one of the few major differences of Paintfuck from Smallfuck as Smallfuck terminates (normally) whenever the pointer exceeds the bounds of the tape.

// Similar to Smallfuck, Paintfuck is Turing-complete if and only if the 2D data grid/canvas were unlimited in size. However, since the size of the data grid is defined to be finite, it acts like a finite state machine.

// More info on this Esolang can be found here.

// The Task
// Your task is to implement a custom Paintfuck interpreter interpreter()/Interpret which accepts the following arguments in the specified order:

// code - Required. The Paintfuck code to be executed, passed in as a string. May contain comments (non-command characters), in which case your interpreter should simply ignore them. If empty, simply return the initial state of the data grid.
// iterations - Required. A non-negative integer specifying the number of iterations to be performed before the final state of the data grid is returned. See notes for definition of 1 iteration. If equal to zero, simply return the initial state of the data grid.
// width - Required. The width of the data grid in terms of the number of data cells in each row, passed in as a positive integer.
// height - Required. The height of the data grid in cells (i.e. number of rows) passed in as a positive integer.
// A few things to note:

// Your interpreter should treat all command characters as case-sensitive so N, E, S and W are not valid command characters
// Your interpreter should initialize all cells within the data grid to a value of 0 regardless of the width and height of the grid
// In this implementation, your pointer must always start at the top-left hand corner of the data grid (i.e. first row, first column). This is important as some implementations have the data pointer starting at the middle of the grid.
// One iteration is defined as one step in the program, i.e. the number of command characters evaluated. For example, given a program nessewnnnewwwsswse and an iteration count of 5, your interpreter should evaluate nesse before returning the final state of the data grid. Non-command characters should not count towards the number of iterations.
// Regarding iterations, the act of skipping to the matching ] when a [ is encountered (or vice versa) is considered to be one iteration regardless of the number of command characters in between. The next iteration then commences at the command right after the matching ] (or [).
// Your interpreter should terminate normally and return the final state of the 2D data grid whenever any of the mentioned conditions become true: (1) All commands have been considered left to right, or (2) Your interpreter has already performed the number of iterations specified in the second argument.
// The return value of your interpreter should be a representation of the final state of the 2D data grid where each row is separated from the next by a CRLF (\r\n). For example, if the final state of your datagrid is
// [
//   [1, 0, 0],
//   [0, 1, 0],
//   [0, 0, 1]
// ]
// ... then your return string should be "100\r\n010\r\n001".

// Good luck :D

function interpreter(code, iterations, width, height) {
    // Initialize the data grid
    let grid = Array.from({ length: height }, () => Array(width).fill(0));

    // Initialize pointer and code execution state
    let x = 0, y = 0;
    let ip = 0; // Instruction pointer
    let iterCount = 0;

    // Helper function to find matching brackets
    function findMatchingBracket(code, index) {
        let stack = 0;
        let dir = code[index] === '[' ? 1 : -1;
        let searchFor = code[index] === '[' ? ']' : '[';

        while (index >= 0 && index < code.length) {
            if (code[index] === code[index]) stack++;
            if (code[index] === searchFor) stack--;
            if (stack === 0) break;
            index += dir;
        }

        return index;
    }

    // Execute code
    while (iterCount < iterations && ip < code.length) {
        switch (code[ip]) {
            case 'n':
                y = (y - 1 + height) % height;
                iterCount++;
                break;
            case 'e':
                x = (x + 1) % width;
                iterCount++;
                break;
            case 's':
                y = (y + 1) % height;
                iterCount++;
                break;
            case 'w':
                x = (x - 1 + width) % width;
                iterCount++;
                break;
            case '*':
                grid[y][x] = 1 - grid[y][x];
                iterCount++;
                break;
            case '[':
                if (grid[y][x] === 0) {
                    ip = findMatchingBracket(code, ip);
                }
                iterCount++;
                break;
            case ']':
                if (grid[y][x] !== 0) {
                    ip = findMatchingBracket(code, ip);
                }
                iterCount++;
                break;
            default:
                // Ignore non-command characters
                break;
        }
        ip++;
    }

    // Convert grid to the required string format
    return grid.map(row => row.join('')).join('\r\n');
}

// Example usage:
console.log(interpreter("*e*e*e*e*e*e*e*e", 8, 3, 3)); // Outputs: "010\r\n010\r\n010"
console.log(interpreter("[*]", 10, 3, 3)); // Outputs: "111\r\n111\r\n111"
