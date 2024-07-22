// General Patron is faced with a problem , his intelligence has intercepted some secret messages from the enemy but they are all encrypted. Those messages are crucial to getting the jump on the enemy and winning the war. Luckily intelligence also captured an encoding device as well. However even the smartest programmers weren't able to crack it though. So the general is asking you , his most odd but brilliant programmer.

// You can call the encoder like this.

// console.log (device.encode ('What the hell')) ;
// Our cryptoanalysts kept poking at it and found some interesting patterns.

// console.log (device.encode ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')) ;
// console.log (device.encode ('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')) ;  
// console.log (device.encode ('!@#$%^&*()_+-')) ;
// console.log ('abcdefghijklmnopqrstuvwxyz') ;
// console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
//   return device.encode (a) ;
// }).join ('')) ;
// console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
//   return device.encode ('_'+a)[1] ;
// }).join ('')) ;
// console.log ('abcdefghijklmnopqrstuvwxyz'.split ('').map (function (a) {
//   return device.encode ('__'+a)[2] ;
// }).join ('')) ;
// We think if you keep on this trail you should be able to crack the code! You are expected to fill in the

// device.decode
// function. Good luck ! General Patron is counting on you!


// Assuming device.encode is already defined and provided

// Step 1: Create a mapping from encoded characters to original characters
let encodingMap = {};

let alphabet = 'abcdefghijklmnopqrstuvwxyz';

for (let i = 0; i < alphabet.length; i++) {
    let originalChar = alphabet[i];
    let encodedChar = device.encode(originalChar);
    encodingMap[encodedChar] = originalChar;
}

// Step 2: Define the decode function
device.decode = function (encodedStr) {
    let decodedStr = '';
    for (let char of encodedStr) {
        decodedStr += encodingMap[char] || char; // Fallback to the original character if not found in the map
    }
    return decodedStr;
}

// Example usage:
// console.log(device.decode(device.encode('What is this ?'))); // Should output 'What is this ?'
