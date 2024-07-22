// Given a Sudoku data structure with size NxN, N > 0 and √N == integer, write a method to validate if it has been filled out correctly.

// The data structure is a multi-dimensional Array, i.e:

// [
//   [7,8,4,  1,5,9,  3,2,6],
//   [5,3,9,  6,7,2,  8,4,1],
//   [6,1,2,  4,3,8,  7,5,9],

//   [9,2,8,  7,1,5,  4,6,3],
//   [3,5,7,  8,4,6,  1,9,2],
//   [4,6,1,  9,2,3,  5,8,7],

//   [8,7,6,  3,9,4,  2,1,5],
//   [2,4,3,  5,6,1,  9,7,8],
//   [1,9,5,  2,8,7,  6,3,4]
// ]
// Rules for validation

// Data structure dimension: NxN where N > 0 and √N == integer
// Rows may only contain integers: 1..N (N included)
// Columns may only contain integers: 1..N (N included)
// 'Little squares' (3x3 in example above) may also only contain integers: 1..N (N included)

var Sudoku = function (data) {
    // Private methods
    const N = data.length;
    const sqrtN = Math.sqrt(N);

    if (Number.isInteger(sqrtN) === false) {
        throw new Error('Invalid Sudoku: The size of the grid must be a perfect square');
    }

    const isValidSet = (arr) => {
        const set = new Set(arr);
        for (let i = 1; i <= N; i++) {
            if (!set.has(i)) {
                return false;
            }
        }
        return true;
    };

    const checkRows = () => {
        for (let row of data) {
            if (!isValidSet(row)) {
                return false;
            }
        }
        return true;
    };

    const checkCols = () => {
        for (let col = 0; col < N; col++) {
            const column = [];
            for (let row = 0; row < N; row++) {
                column.push(data[row][col]);
            }
            if (!isValidSet(column)) {
                return false;
            }
        }
        return true;
    };

    const checkSubGrids = () => {
        for (let row = 0; row < N; row += sqrtN) {
            for (let col = 0; col < N; col += sqrtN) {
                const subGrid = [];
                for (let r = row; r < row + sqrtN; r++) {
                    for (let c = col; c < col + sqrtN; c++) {
                        subGrid.push(data[r][c]);
                    }
                }
                if (!isValidSet(subGrid)) {
                    return false;
                }
            }
        }
        return true;
    };

    // Public methods
    return {
        isValid: function () {
            return checkRows() && checkCols() && checkSubGrids();
        }
    };
};

// Example usage:
const validSudoku = [
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],
    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],
    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 4]
];

const invalidSudoku = [
    [7, 8, 4, 1, 5, 9, 3, 2, 6],
    [5, 3, 9, 6, 7, 2, 8, 4, 1],
    [6, 1, 2, 4, 3, 8, 7, 5, 9],
    [9, 2, 8, 7, 1, 5, 4, 6, 3],
    [3, 5, 7, 8, 4, 6, 1, 9, 2],
    [4, 6, 1, 9, 2, 3, 5, 8, 7],
    [8, 7, 6, 3, 9, 4, 2, 1, 5],
    [2, 4, 3, 5, 6, 1, 9, 7, 8],
    [1, 9, 5, 2, 8, 7, 6, 3, 3]  // Duplicate number 3 in the last row and column
];

console.log(new Sudoku(validSudoku).isValid()); // Output: true
console.log(new Sudoku(invalidSudoku).isValid()); // Output: false
