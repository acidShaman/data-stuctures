// Write a function called sumIntervals/sum_intervals that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

// Intervals
// Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

// Overlapping Intervals
// List containing overlapping intervals:

// [
//    [1, 4],
//    [7, 10],
//    [3, 5]
// ]
// The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5], which has a length of 4.

// Examples:
// sumIntervals( [
//    [1, 2],
//    [6, 10],
//    [11, 15]
// ] ) => 9

// sumIntervals( [
//    [1, 4],
//    [7, 10],
//    [3, 5]
// ] ) => 7

// sumIntervals( [
//    [1, 5],
//    [10, 20],
//    [1, 6],
//    [16, 19],
//    [5, 11]
// ] ) => 19

// sumIntervals( [
//    [0, 20],
//    [-100000000, 10],
//    [30, 40]
// ] ) => 100000030
// Tests with large intervals
// Your algorithm should be able to handle large intervals. All tested intervals are subsets of the range [-1000000000, 1000000000].

function sumIntervals(intervals) {
    if (!intervals || intervals.length === 0) return 0;
  
    // Sort the intervals by their starting point
    intervals.sort((a, b) => a[0] - b[0]);
  
    let mergedIntervals = [];
    let currentInterval = intervals[0];
  
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= currentInterval[1]) {
        // Overlapping intervals, merge them
        currentInterval[1] = Math.max(currentInterval[1], intervals[i][1]);
      } else {
        // Non-overlapping interval, push the current interval and move to the next
        mergedIntervals.push(currentInterval);
        currentInterval = intervals[i];
      }
    }
  
    // Push the last interval
    mergedIntervals.push(currentInterval);
  
    // Calculate the total length of the merged intervals
    return mergedIntervals.reduce((sum, interval) => sum + (interval[1] - interval[0]), 0);
  }
  
  // Example usage:
  console.log(sumIntervals([
    [1, 2],
    [6, 10],
    [11, 15]
  ])); // Output: 9
  
  console.log(sumIntervals([
    [1, 4],
    [7, 10],
    [3, 5]
  ])); // Output: 7
  
  console.log(sumIntervals([
    [1, 5],
    [10, 20],
    [1, 6],
    [16, 19],
    [5, 11]
  ])); // Output: 19
  
  console.log(sumIntervals([
    [0, 20],
    [-100000000, 10],
    [30, 40]
  ])); // Output: 100000030