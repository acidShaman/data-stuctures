// Return the number (count) of vowels in the given string.

// We will consider a, e, i, o, u as vowels for this Kata (but not y).

// The input string will only consist of lower case letters and/or spaces.

// export class Kata {
//     static getCount(str: string): number {
//       // your code here
//     }
//   }

export class Kata {
    static getCount(str: string): number {
      // Define a set of vowels
      const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
      
      // Initialize a counter for the vowels
      let count = 0;
      
      // Loop through each character in the string
      for (let char of str) {
        // Check if the character is a vowel
        if (vowels.has(char)) {
          count++;
        }
      }
      
      return count;
    }
  }
  
  // Example usage:
  console.log(Kata.getCount("hello world")); // Output: 3
  console.log(Kata.getCount("typescript")); // Output: 2
  console.log(Kata.getCount("this is a test")); // Output: 4