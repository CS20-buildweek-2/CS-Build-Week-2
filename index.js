require("dotenv").config();
const Actions = require("./actions.js");

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
        messages: ["You have walked south."]
    }
};

function getExits() {
    let exitsObj = {};
    currentRoom.exits.forEach(direction => {
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

let prevRoom = 0;
let currentRoom = Actions.movement("n");
