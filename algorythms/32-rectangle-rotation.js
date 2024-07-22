// A rectangle with sides equal to even integers a and b is drawn on the Cartesian plane. Its center (the intersection point of its diagonals) coincides with the point (0, 0), but the sides of the rectangle are not parallel to the axes; instead, they are forming 45 degree angles with the axes.
// How many points with integer coordinates are located inside the given rectangle (including on its sides)?

// Example
// For a = 6 and b = 4, the output should be 23
// The following picture illustrates the example, and the 23 points are marked green.



// Input/Output
// [input] integer a
// A positive even integer.
// Constraints: 2 ≤ a ≤ 10000.
// [input] integer b
// A positive even integer.
// Constraints: 2 ≤ b ≤ 10000.
// [output] an integer
// The number of inner points with integer coordinates.

function rectangleRotation(a, b) {
    const sqrt2 = Math.sqrt(2) / 2;

    let count = 0;

    // Iterate over a sufficiently large bounding box
    for (let x = -a - b; x <= a + b; x++) {
        for (let y = -a - b; y <= a + b; y++) {
            // Rotate the point by -45 degrees
            let newX = (x + y) * sqrt2;
            let newY = (y - x) * sqrt2;

            // Check if the new point lies within the original rectangle bounds
            if (Math.abs(newX) <= a / 2 && Math.abs(newY) <= b / 2) {
                count++;
            }
        }
    }

    return count;
}

// Example usage:
console.log(rectangleRotation(6, 4)); // Output: 23
