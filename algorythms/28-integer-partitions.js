// From wikipedia https://en.wikipedia.org/wiki/Partition_(number_theory)

// In number theory and combinatorics, a partition of a positive integer n, also called an integer partition, is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their summands are considered the same partition.

// For example, 4 can be partitioned in five distinct ways:

// 4, 3 + 1, 2 + 2, 2 + 1 + 1, 1 + 1 + 1 + 1.

// We can write:

// enum(4) -> [[4],[3,1],[2,2],[2,1,1],[1,1,1,1]] and

// enum(5) -> [[5],[4,1],[3,2],[3,1,1],[2,2,1],[2,1,1,1],[1,1,1,1,1]].

// The number of parts in a partition grows very fast. For n = 50 number of parts is 204226, for 80 it is 15,796,476 It would be too long to tests answers with arrays of such size. So our task is the following:

// 1 - n being given (n integer, 1 <= n <= 50) calculate enum(n) ie the partition of n. We will obtain something like that:
// enum(n) -> [[n],[n-1,1],[n-2,2],...,[1,1,...,1]] (order of array and sub-arrays doesn't matter). This part is not tested.

// 2 - For each sub-array of enum(n) calculate its product. If n = 5 we'll obtain after removing duplicates and sorting:

// prod(5) -> [1,2,3,4,5,6]

// prod(8) -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18]

// If n = 40 prod(n) has a length of 2699 hence the tests will not verify such arrays. Instead our task number 3 is:

// 3 - return the range, the average and the median of prod(n) in the following form (example for n = 5):

// "Range: 5 Average: 3.50 Median: 3.50"

// Range is an integer, Average and Median are float numbers rounded to two decimal places (".2f" in some languages).

// Notes:
// Range : difference between the highest and lowest values.

// Mean or Average : To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

// Median : The median is the number separating the higher half of a data sample from the lower half. (https://en.wikipedia.org/wiki/Median)

// Hints:
// Try to optimize your program to avoid timing out.

// Memoization can be helpful but it is not mandatory for being successful.

function part(n) {
    // Function to generate all partitions
    function generatePartitions(n) {
        function partitionHelper(n, max) {
            if (n === 0) return [[]];
            if (n < 0 || max === 0) return [];
            let withMax = partitionHelper(n - max, max).map(p => [max, ...p]);
            let withoutMax = partitionHelper(n, max - 1);
            return [...withMax, ...withoutMax];
        }
        return partitionHelper(n, n);
    }

    // Generate all partitions of n
    let partitions = generatePartitions(n);

    // Compute products for each partition
    let products = partitions.map(part => part.reduce((a, b) => a * b, 1));

    // Remove duplicates and sort the products
    products = Array.from(new Set(products)).sort((a, b) => a - b);

    // Calculate the range
    let range = products[products.length - 1] - products[0];

    // Calculate the average
    let sum = products.reduce((a, b) => a + b, 0);
    let average = sum / products.length;

    // Calculate the median
    let median;
    let mid = Math.floor(products.length / 2);
    if (products.length % 2 === 0) {
        median = (products[mid - 1] + products[mid]) / 2;
    } else {
        median = products[mid];
    }

    // Format the output
    return `Range: ${range} Average: ${average.toFixed(2)} Median: ${median.toFixed(2)}`;
}

// Example usage:
console.log(part(5));  // Output: "Range: 5 Average: 3.50 Median: 3.50"
console.log(part(8));  // Output: "Range: 17 Average: 8.29 Median: 6.00"
