// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

// Example:

// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples
// The output expected would be:

// apples, pears
// grapes
// bananas
// The code would be called like so:

// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// // result should == "apples, pears\ngrapes\nbananas"

function solution(input, markers) {
    return input.split('\n').map(line => {
        let minIndex = line.length;
        markers.forEach(marker => {
            let index = line.indexOf(marker);
            if (index !== -1 && index < minIndex) {
                minIndex = index;
            }
        });
        return line.slice(0, minIndex).trim();
    }).join('\n');
}

// Example usage:
var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]);
console.log(result); // Output: "apples, pears\ngrapes\nbananas"
