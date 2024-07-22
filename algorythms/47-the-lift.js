// Synopsis
// A multi-floor building has a Lift in it.

// People are queued on different floors waiting for the Lift.

// Some people want to go up. Some people want to go down.

// The floor they want to go to is represented by a number (i.e. when they enter the Lift this is the button they will press)

// BEFORE (people waiting in queues)               AFTER (people at their destinations)
//                    +--+                                          +--+ 
//   /----------------|  |----------------\        /----------------|  |----------------\
// 10|                |  | 1,4,3,2        |      10|             10 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  9|                |  | 1,10,2         |       9|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  8|                |  |                |       8|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  7|                |  | 3,6,4,5,6      |       7|                |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  6|                |  |                |       6|          6,6,6 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  5|                |  |                |       5|            5,5 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  4|                |  | 0,0,0          |       4|          4,4,4 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  3|                |  |                |       3|            3,3 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  2|                |  | 4              |       2|          2,2,2 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  1|                |  | 6,5,2          |       1|            1,1 |  |                |
//   |----------------|  |----------------|        |----------------|  |----------------|
//  G|                |  |                |       G|          0,0,0 |  |                |
//   |====================================|        |====================================|
// Rules
// Lift Rules
// The Lift only goes up or down!
// Each floor has both UP and DOWN Lift-call buttons (except top and ground floors which have only DOWN and UP respectively)
// The Lift never changes direction until there are no more people wanting to get on/off in the direction it is already travelling
// When empty the Lift tries to be smart. For example,
// If it was going up then it will continue up to collect the highest floor person wanting to go down
// If it was going down then it will continue down to collect the lowest floor person wanting to go up
// The Lift has a maximum capacity of people
// When called, the Lift will stop at a floor even if it is full, although unless somebody gets off nobody else can get on!
// If the lift is empty, and no people are waiting, then it will return to the ground floor
// People Rules
// People are in "queues" that represent their order of arrival to wait for the Lift
// All people can press the UP/DOWN Lift-call buttons
// Only people going the same direction as the Lift may enter it
// Entry is according to the "queue" order, but those unable to enter do not block those behind them that can
// If a person is unable to enter a full Lift, they will press the UP/DOWN Lift-call button again after it has departed without them
// Kata Task
// Get all the people to the floors they want to go to while obeying the Lift rules and the People rules
// Return a list of all floors that the Lift stopped at (in the order visited!)
// NOTE: The Lift always starts on the ground floor (and people waiting on the ground floor may enter immediately)

// I/O
// Input
// queues a list of queues of people for all floors of the building.
// The height of the building varies
// 0 = the ground floor
// Not all floors have queues
// Queue index [0] is the "head" of the queue
// Numbers indicate which floor the person wants go to
// capacity maximum number of people allowed in the lift
// Parameter validation - All input parameters can be assumed OK. No need to check for things like:

// People wanting to go to floors that do not exist
// People wanting to take the Lift to the floor they are already on
// Buildings with < 2 floors
// Basements
// Output
// A list of all floors that the Lift stopped at (in the order visited!)

var theLift = function (queues, capacity) {
    let stops = [];       
    let lift = [];        
    let currentFloor = 0; 
    let direction = 'up'; 

    const floors = queues.length; 

    // Helper function to check if there are any people waiting in any queue
    const anyPeopleWaiting = () => {
        for (let i = 0; i < floors; i++) {
            if (queues[i].length > 0) return true;
        }
        return false;
    };

    // Helper function to add floor to stops if not already the last stop
    const addStop = (floor) => {
        if (stops.length === 0 || stops[stops.length - 1] !== floor) {
            stops.push(floor);
        }
    };

    while (true) {
        // People get off
        lift = lift.filter(person => {
            if (person === currentFloor) {
                addStop(currentFloor);
                return false;
            }
            return true;
        });

        // People get on
        while (queues[currentFloor].length > 0 && lift.length < capacity) {
            let person = queues[currentFloor][0];
            if ((direction === 'up' && person > currentFloor) || (direction === 'down' && person < currentFloor)) {
                lift.push(person);
                queues[currentFloor].shift();
                addStop(currentFloor);
            } else {
                break;
            }
        }

        // Change direction if needed
        if (direction === 'up' && currentFloor === floors - 1) {
            direction = 'down';
        } else if (direction === 'down' && currentFloor === 0) {
            direction = 'up';
        } else if (direction === 'up') {
            let anyHigher = false;
            for (let i = currentFloor + 1; i < floors; i++) {
                if (queues[i].length > 0 || lift.some(person => person > currentFloor)) {
                    anyHigher = true;
                    break;
                }
            }
            if (!anyHigher) {
                direction = 'down';
            }
        } else if (direction === 'down') {
            let anyLower = false;
            for (let i = currentFloor - 1; i >= 0; i--) {
                if (queues[i].length > 0 || lift.some(person => person < currentFloor)) {
                    anyLower = true;
                    break;
                }
            }
            if (!anyLower) {
                direction = 'up';
            }
        }

        // Move to the next floor
        if (direction === 'up') {
            currentFloor++;
        } else if (direction === 'down') {
            currentFloor--;
        }

        // Check if the lift should stop
        if (lift.length === 0 && !anyPeopleWaiting() && currentFloor === 0) {
            break;
        }

        // If the lift is empty and no more people are waiting, go to the ground floor
        if (lift.length === 0 && !anyPeopleWaiting()) {
            if (currentFloor !== 0) {
                addStop(0);
                currentFloor = 0;
            }
            break;
        }
    }

    return stops;
}

// Example usage:
console.log(theLift([
    [], // Ground
    [6], // First floor
    [], // Second floor
    [], // Third floor
    [4], // Fourth floor
    [], // Fifth floor
    []  // Sixth floor
], 5)); // Output: [0, 1, 6, 4, 1, 0]
