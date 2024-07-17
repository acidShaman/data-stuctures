function sudoku(puzzle) {
    // Check if a number can be placed at puzzle[row][col]
    function isValid(puzzle, row, col, num) {
        // Check the row
        for (let i = 0; i < 9; i++) {
            if (puzzle[row][i] === num) return false;
        }
        // Check the column
        for (let i = 0; i < 9; i++) {
            if (puzzle[i][col] === num) return false;
        }
        // Check the 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (puzzle[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    // Solve the Sudoku puzzle using backtracking
    function solve(puzzle) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Find an empty cell
                if (puzzle[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        // Check if the number can be placed
                        if (isValid(puzzle, row, col, num)) {
                            puzzle[row][col] = num;
                            // Recursively attempt to solve the rest of the puzzle
                            if (solve(puzzle)) {
                                return true;
                            }
                            // If not solvable, reset the cell and backtrack
                            puzzle[row][col] = 0;
                        }
                    }
                    return false; // Trigger backtracking
                }
            }
        }
        return true; // Puzzle solved
    }

    // Make a copy of the puzzle to avoid modifying the input directly
    const puzzleCopy = puzzle.map(row => row.slice());
    solve(puzzleCopy);
    return puzzleCopy;
}

// Example usage:
var puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log(sudoku(puzzle));