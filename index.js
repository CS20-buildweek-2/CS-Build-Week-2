require("dotenv").config();
const Actions = require("./actions.js");
const fs = require("fs");

let traversalPath = {
    0: {
        room_id: 0,
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
    console.log("roomInit() RAN");
    traversalPath[currentRoom.room_id] = {
        room_id: currentRoom.room_id,
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

async function getCurrentRoom(travelDir) {
    try {
        currentRoom = await Actions.movement(travelDir);
    } catch (err) {
        console.log(err);
    }
    return currentRoom;
}

async function moveLog(travelDir) {
    prevRoom = currentRoom.room_id;
    console.log(currentRoom);
    prevDir = travelDir;
    try {
        currentRoom = await getCurrentRoom(travelDir);
        trail.push(oppositeDirection(travelDir));
        if (!(currentRoom.room_id in traversalPath)) {
            roomInit();
        }
        traversalPath[prevRoom]["exits"][travelDir] = currentRoom.room_id;
    } catch (err) {
        console.log(err);
    }
}

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

moveLog("s");
// Actions.treasurePickup();
// Actions.treasureSell();
// Actions.treasureSellConfirm();
// Actions.nameChange("Logan");

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
