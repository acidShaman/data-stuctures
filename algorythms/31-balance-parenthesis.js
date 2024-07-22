// Write a function which makes a list of strings representing all of the ways you can balance n pairs of parentheses

// Examples
// balancedParens(0) => [""]
// balancedParens(1) => ["()"]
// balancedParens(2) => ["()()","(())"]
// balancedParens(3) => ["()()()","(())()","()(())","(()())","((()))"]
function balancedParens(n) {
    let result = [];
  
    function generate(current, open, close) {
      if (current.length === 2 * n) {
        result.push(current);
        return;
      }
  
      if (open < n) {
        generate(current + '(', open + 1, close);
      }
      if (close < open) {
        generate(current + ')', open, close + 1);
      }
    }
  
    generate('', 0, 0);
    return result;
  }
  
  // Example usage:
  console.log(balancedParens(0)); // Output: [""]
  console.log(balancedParens(1)); // Output: ["()"]
  console.log(balancedParens(2)); // Output: ["()()", "(())"]
  console.log(balancedParens(3)); // Output: ["()()()", "()(())", "(())()", "(()())", "((()))"]
  