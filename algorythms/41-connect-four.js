// Connect Four
// Take a look at wiki description of Connect Four game:

// Wiki Connect Four

// The grid is 6 row by 7 columns, those being named from A to G.

// You will receive a list of strings showing the order of the pieces which dropped in columns:

//   piecesPositionList = ["A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "A_Red",
//                         "B_Yellow",
//                         "G_Red",
//                         "B_Yellow"]
// The list may contain up to 42 moves and shows the order the players are playing.

// The first player who connects four items of the same color is the winner.

// You should return "Yellow", "Red" or "Draw" accordingly.

function whoIsWinner(piecesPositionList) {
    const rows = 6;
    const cols = 7;
    const board = Array.from({ length: rows }, () => Array(cols).fill(null));
    const colMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6 };

    for (const move of piecesPositionList) {
        const [colLetter, color] = move.split('_');
        const col = colMap[colLetter];

        // Find the first empty row in the current column
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = color;
                if (checkWin(board, row, col, color)) {
                    return color;
                }
                break;
            }
        }
    }

    return "Draw";
}

function checkWin(board, row, col, color) {
    return checkDirection(board, row, col, color, 1, 0) || // Horizontal
        checkDirection(board, row, col, color, 0, 1) || // Vertical
        checkDirection(board, row, col, color, 1, 1) || // Diagonal \
        checkDirection(board, row, col, color, 1, -1);  // Diagonal /
}

function checkDirection(board, row, col, color, deltaRow, deltaCol) {
    let count = 0;

    // Check in both directions
    for (let i = -3; i <= 3; i++) {
        const newRow = row + i * deltaRow;
        const newCol = col + i * deltaCol;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length && board[newRow][newCol] === color) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    return false;
}

// Example usage:
console.log(whoIsWinner([
    "A_Red", "B_Yellow", "A_Red", "B_Yellow", "A_Red", "B_Yellow", "G_Red", "B_Yellow"
])); // Output: "Yellow"
console.log(whoIsWinner([
    "A_Red", "A_Red", "A_Red", "A_Red", "A_Red", "A_Red", "G_Red", "B_Yellow"
])); // Output: "Red"
