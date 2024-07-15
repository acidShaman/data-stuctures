class SuffixArray {
    private text: string;
    private suffixArray: number[];

    constructor(text: string) {
        this.text = text;
        this.suffixArray = this.buildSuffixArray(text);
    }

    private buildSuffixArray(text: string): number[] {
        const suffixes: { index: number; suffix: string }[] = [];
        for (let i = 0; i < text.length; i++) {
            suffixes.push({ index: i, suffix: text.substring(i) });
        }

        suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

        const suffixArray = suffixes.map(suffix => suffix.index);
        return suffixArray;
    }

    search(pattern: string): number[] {
        const result: number[] = [];
        let left = 0;
        let right = this.suffixArray.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const suffix = this.text.substring(this.suffixArray[mid]);

            if (suffix.startsWith(pattern)) {
                result.push(this.suffixArray[mid]);

                // Find other occurrences on the left side
                let temp = mid - 1;
                while (temp >= 0 && this.text.substring(this.suffixArray[temp]).startsWith(pattern)) {
                    result.push(this.suffixArray[temp]);
                    temp--;
                }

                // Find other occurrences on the right side
                temp = mid + 1;
                while (temp < this.suffixArray.length && this.text.substring(this.suffixArray[temp]).startsWith(pattern)) {
                    result.push(this.suffixArray[temp]);
                    temp++;
                }

                break;
            } else if (suffix < pattern) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result.sort((a, b) => a - b);
    }

    printSuffixArray(): void {
        console.log(this.suffixArray);
    }

    printSuffixes(): void {
        for (let i = 0; i < this.suffixArray.length; i++) {
            console.log(`${this.suffixArray[i]}: ${this.text.substring(this.suffixArray[i])}`);
        }
    }
}

// Usage example:
const text = "banana";
const suffixArray = new SuffixArray(text);

suffixArray.printSuffixArray(); // Output: [5, 3, 1, 0, 4, 2]
suffixArray.printSuffixes();
// Output:
// 5: a
// 3: ana
// 1: anana
// 0: banana
// 4: na
// 2: nana

const searchPattern = "ana";
const occurrences = suffixArray.search(searchPattern);
console.log(`Occurrences of '${searchPattern}':`, occurrences); // Output: Occurrences of 'ana': [1, 3]
