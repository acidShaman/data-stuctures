// In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

// Examples:

// "one" => 1
// "twenty" => 20
// "two hundred forty-six" => 246
// "seven hundred eighty-three thousand nine hundred and nineteen" => 783919
// Additional Notes:

// The minimum number is "zero" (inclusively)
// The maximum number, which must be supported is 1 million (inclusively)
// The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
// All tested numbers are valid, you don't need to validate them

function parseInt(string) {
    const units = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    };

    const teens = {
        "ten": 10,
        "eleven": 11,
        "twelve": 12,
        "thirteen": 13,
        "fourteen": 14,
        "fifteen": 15,
        "sixteen": 16,
        "seventeen": 17,
        "eighteen": 18,
        "nineteen": 19
    };

    const tens = {
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60,
        "seventy": 70,
        "eighty": 80,
        "ninety": 90
    };

    const multiples = {
        "hundred": 100,
        "thousand": 1000,
        "million": 1000000
    };

    let words = string.replace(/-/g, ' ').split(' ');
    let total = 0;
    let current = 0;

    words.forEach(word => {
        if (units.hasOwnProperty(word)) {
            current += units[word];
        } else if (teens.hasOwnProperty(word)) {
            current += teens[word];
        } else if (tens.hasOwnProperty(word)) {
            current += tens[word];
        } else if (multiples.hasOwnProperty(word)) {
            if (word === "hundred") {
                current *= multiples[word];
            } else {
                total += current * multiples[word];
                current = 0;
            }
        }
    });

    return total + current;
}

// Example usage:
console.log(parseInt("one")); // 1
console.log(parseInt("twenty")); // 20
console.log(parseInt("two hundred forty-six")); // 246
console.log(parseInt("seven hundred eighty-three thousand nine hundred and nineteen")); // 783919
console.log(parseInt("one million")); // 1000000
