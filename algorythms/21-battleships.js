// Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, false otherwise. Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.

// Battleship (also Battleships or Sea Battle) is a guessing game for two players. Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.


// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
// Each ship must be a straight line, except for submarines, which are just single cell.

// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.

// This is all you need to solve this kata. If you're interested in more information about the game, visit this link.

function validateBattlefield(field) {
    // Directions for checking adjacent cells
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    // Function to check if a cell is within the board boundaries
    const isInBounds = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;

    // Function to count ships and check for adjacent cells
    const markShipAndCount = (x, y, visited) => {
        const queue = [[x, y]];
        visited[x][y] = true;
        let cells = [[x, y]]; // To store ship cells

        while (queue.length > 0) {
            const [cx, cy] = queue.shift();

            for (let [dx, dy] of [[0, 1], [1, 0]]) {
                const nx = cx + dx, ny = cy + dy;

                if (isInBounds(nx, ny) && field[nx][ny] === 1 && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                    cells.push([nx, ny]);
                }
            }
        }

        // Check if ship is straight
        const isVertical = cells.every(([cx, cy]) => cy === cells[0][1]);
        const isHorizontal = cells.every(([cx, cy]) => cx === cells[0][0]);

        if (!isVertical && !isHorizontal) return -1;

        // Check for adjacent cells
        for (let [sx, sy] of cells) {
            for (let [dx, dy] of directions) {
                const ax = sx + dx, ay = sy + dy;
                if (isInBounds(ax, ay) && field[ax][ay] === 1 && !visited[ax][ay]) {
                    return -1;
                }
            }
        }

        return cells.length;
    };

    const shipCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

    const visited = Array.from({ length: 10 }, () => Array(10).fill(false));

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (field[i][j] === 1 && !visited[i][j]) {
                const shipSize = markShipAndCount(i, j, visited);

                if (shipSize === -1 || shipSize > 4) {
                    return false;
                }

                shipCounts[shipSize]++;
            }
        }
    }

    return shipCounts[1] === 4 && shipCounts[2] === 3 && shipCounts[3] === 2 && shipCounts[4] === 1;
}

// Example usage:
const field = [
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
console.log(validateBattlefield(field)); // Output: true or false
