require("dotenv").config();
const Actions = require("./actions.js");
const fs = require("fs");

let traversalPath = {
    0: {
        title: "A brightly lit room",
        description:
            "You are standing in the center of a brightly lit room. You notice a shop to the west and exits to the north, south and east.",
        coordinates: "(60,60)",
        elevation: 0,
        terrain: "NORMAL",
        players: [],
        items: [],
        exits: { n: "?", s: "?", e: "?", w: "?" },
        cooldown: 15,
        errors: [],
        messages: []
    }
};
let prevRoom = 0;
let currentRoom = traversalPath[0];
let prevDir = null;
let trail = [];

function getExits() {
    let exitsObj = {};
    Object.keys(currentRoom.exits).forEach(direction => {
        exitsObj[direction] = "?";
    });
    return exitsObj;
}

function roomInit() {
    traversalPath[currentRoom.room_id] = {
        title: currentRoom.title,
        description: currentRoom.description,
        coordinates: currentRoom.coordinates,
        elevation: currentRoom.elevation,
        terrain: currentRoom.terrain,
        players: currentRoom.players,
        items: currentRoom.items,
        exits: getExits(),
        cooldown: currentRoom.cooldown,
        errors: currentRoom.errors,
        messages: currentRoom.messages
    };
}

function containsQuestion() {
    currentRoom.exits.forEach(direction => {
        if (traversalPath[currentRoom.room_id][exits][direction] == "?") {
            return true;
        } else {
            return false;
        }
    });
}

function oppositeDirection(direction) {
    if (direction == "n") {
        return "s";
    } else if (direction == "s") {
        return "n";
    } else if (direction == "w") {
        return "e";
    } else if (direction == "e") {
        return "w";
    }
}

function moveLog(travelDir) {
    prevRoom = currentRoom.room_id;
    prevDir = travelDir;
    Actions.movement(travelDir);
    trail.push(oppositeDirection(travelDir));
    if (!(currentRoom.room_id in traversalPath)) {
        roomInit();
    }

    traversalPath[prevRoom]["exits"][travelDir] = currentRoom.room_id;
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

console.log(async function() {
    const data = await Actions.movement("n");
    return data;
});

fs.writeFile(
    "graphFile.txt",
    JSON.stringify(traversalPath, null, 2),
    { flag: "a" },
    function(err) {
        if (err) {
            return console.log(err);
        }
    }
);

// Maybe start by going until you hit 100 rooms or even 10 rooms
// while (Object.keys(traversalPath).length < 500) {
//     let travelDir = ""
//     let unknown = []

//     if(containsQuestion()){

//     }
// }
