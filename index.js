require("dotenv").config();
const fs = require('fs');
const axios = require("axios");
const token = process.env.TOKEN;
const Graph = require("graph-data-structure");

// clear file store RAGE QUIT
function clearStore() {
    fs.writeFile(
        "player.json",
        "{}",
        { flag: "w" },
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    )
}

// persist your graph, force sync after every function
function syncStore(data) {
    fs.writeFileSync(
        "player.json",
        JSON.stringify(data),
        { flag: "w+" },
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    )
}

function initStorage() {
    // check for storage file
    try {
        fs.statSync('player.json')
        console.log("Player file exists, loading...")
        loadStorage()
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.log("Creating player file")
            syncStore({ "titleLocations": {}, "explored": [], "unexplored": [], "moveHistory": [] })
        }
    }
}

function loadStorage() {
    let store = JSON.parse(fs.readFileSync('player.json', 'utf-8'))
}

// helper for cooldown
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


// helper for requests with cooldown built in
async function cooldownreq(endpoint, method, data) {
    try {
        let res = await axios({
            baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/',
            headers: {
                Authorization: `Token ${token}`,
                'content-Type': 'application/json'
            },
            method: `${method}`,
            url: `${endpoint}`,
            data: JSON.stringify(data)
        })
        res = await res.data
        await sleep(res.cooldown * 1000)
        return res
    } catch (err) {
        console.error(err)
    }
}

// player functions // `https://github.com/CS20-buildweek-2/CS-Build-Week-2/blob/master/README.md')
async function init() {
    var init = (await cooldownreq('adv/init/', 'get'))
    return init
}
async function status() {
    var status = (await cooldownreq('adv/status/', 'post'))
    return status
}
async function move(parameter) {
    var move = (await cooldownreq('adv/move/', 'post', 'parameter'))
    return move
}
async function movewise(parameter) {
    var movewise = (await cooldownreq('adv/move/', 'post', 'parameter'))
    return movewise
}
async function take(parameter) {
    var take = (await cooldownreq('adv/take/', 'post', 'parameter'))
    return take
}
async function drop(parameter) {
    var drop = (await cooldownreq('adv/drop/', 'post', 'parameter'))
    return drop
}
async function sell(parameter) {
    var sell = (await cooldownreq('adv/sell/', 'post', 'parameter'))
    return sell
}
async function sell(parameter) {
    var sell = (await cooldownreq('adv/sell/', 'post', 'parameter'))
    return sell
}
async function wear(parameter) {
    var wear = (await cooldownreq('adv/wear/', 'post', 'parameter'))
    return wear
}
async function change_name(parameter) {
    var change_name = (await cooldownreq('adv/change_name/', 'post', 'parameter'))
    return change_name
}
async function pray() {
    var pray = (await cooldownreq('adv/pray/', 'post'))
    return pray
}
async function fly(parameter) {
    var fly = (await cooldownreq('adv/fly/', 'post', 'parameter'))
    return fly
}
async function dash(parameter) {
    var dash = (await cooldownreq('adv/dash/', 'post', 'parameter'))
    return dash
}
async function carry(parameter) {
    var carry = (await cooldownreq('adv/carry/', 'post', 'parameter'))
    return carry
}
async function receive() {
    var receive = (await cooldownreq('adv/receive/', 'post'))
    return receive
}
async function ine(parameter) {
    var ine = (await cooldownreq('bc/mine/', 'post', 'parameter'))
    return ine
}
async function ast_proof(parameter) {
    var ast_proof = (await cooldownreq('bc/last_proof/', 'get'))
    return ast_proof
}
async function et_balance() {
    var et_balance = (await cooldownreq('bc/get_balance/', 'get'))
    return et_balance
}
async function transmogrify(parameter) {
    var transmogrify = (await cooldownreq('adv/transmogrify/', 'post', 'parameter'))
    return transmogrify
}


// naive node discovery, use in conjunction with graph object
function backtrack(lastmove) {
    if (lastmove === 'n') {
        return 's'
    } else if (lastmove === 'e') {
        return 'w'
    } else if (lastmove === 's') {
        return 'n'
    } else if (lastmove === 'w') {
        return 'e'
    }
}

// Print room & game state
async function stateTables() {
    const initres = await init()
    delete initres["description"] // the description ruins large font tables
    console.table(initres)
    console.table(await status())
}

// Player commands
function commandlist() {
    var commands = JSON.parse(fs.readFileSync('./commands.json', 'utf-8'))
    console.table(commands)
}

// player logic
async function main() {
    await initStorage()
    // await stateTables() // print game state
    let explored = await store.explored
    let unexplored = await store.unexplored
    // list player commands
    // commandlist()
    // let store = JSON.parse(fs.readFileSync('./player.json', 'utf-8'))

    // Explore 
    while (store.explored.length <= 500) {
        let playerinfo = await status()
        let roominfo = await init()
        // check for treasure
        if (
            roominfo.items.length &&
            playerinfo.encumbrance < playerinfo.strength &&
            playerinfo.gold <= 1000
        ) {
            for (let item of roominfo.items) {
                await take(item)
            }
        } // else console.log('no item in room ¯\_(ツ)_/¯')


        // Shop Logic
        // if (roominfo.title.includes('Shop')) {
        // await storage.titleLocations.push(`Shop-Room-ID`, this_room_id)
        // sell({ name: 'treasure', confirm: 'yes' })
        // }
        // 
        // Name Change Logic
        // if (roominfo.title.includes('Pirate Ry')) {
        // await storage.titleLocations.push(`Pirate-Room-ID`, this_room_id)
        // if (playerinfo.gold >= 1000) {
        //   await change_name({ name: process.env.NAME, confirm: 'aye'})
        // }


        if (unexplored.length > 0) {
            let direction = unexplored[Math.floor(Math.random() * unexplored.length)]

            // travel in a random direction
            let nextroom = await move({ direction: direction })

            if (traveled[traveled.length - 1] != this_room_id) {
                traveled.push(this_room_id)
            }

            visited[this_room_id][direction] = new_room_id
            if (!(new_room_id in visited)) {
                visited[new_room_id] = {}

                for (let i = 0; i < nextroom.exits.length; i++) {
                    visited[new_room_id][nextroom.exits[i]] = '?'
                }
            }
            let backtrack = the_other_side(direction)
            visited[new_room_id][backtrack] = this_room_id
            await storage.visited.push(explored)

            if (
                current_room.items.length &&
                player.encumbrance < player.strength &&
                parseInt(player.gold) <= 1000
            ) {
                for (let item of current_room.items) {
                    await take({ name: item })
                }
            }
        } else {

            let toexplore = []

            let backwards_movement = traveled.pop()

            for (x in visited[this_room_id]) {
                if (visited[this_room_id][x] === backwards_movement) {
                    await move({ direction: x, next_room_id: JSON.stringify(backwards_movement) })

                    if (
                        current_room.items.length &&
                        player.encumbrance < player.strength &&
                        parseInt(player.gold) <= 1000
                    ) {
                        for (let item of current_room.items) {
                            await take({ name: item })
                        }
                    }
                }
                // store.unexplored.push("test")
                // syncStore(store)
                // statetables()
            }
        }
    }
}
// main()
// stateTables()
// clearStore(


// {"key":"Shop-Room-ID","value":1}
// {"key":"Pirate-Room-ID","value":467}
// 250 treasure room