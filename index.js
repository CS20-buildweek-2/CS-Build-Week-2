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
                Authorization: `Token ${process.env.TOKEN}`,
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
function wander(lastmove) {
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
async function statetables() {
    const initres = await init()
    delete initres["description"] // the description ruins large font tables
    console.table(initres)
    console.table(await status())
}

// Player commands
function commandlist() {
    var commands = JSON.parse(fs.readFileSync('player.json', 'utf-8'))
    console.table(commands)
}

// player logic
async function main() {
    // console.table(await statetables())
    // let playerinfo = await status()
    // let roominfo = await init()

    // manipulate json and write to file
    let store = JSON.parse(fs.readFileSync('player.json', 'utf-8'))
    
    // explore
    // console.log(store.explored.length <= 500)
    
    // store.unexplored.push("test")
    // syncStore(store)
    // statetables()
}

main()

// explored, unexplored, past moves, room_id: roomtitle pairs, 

/*
{
    "titleLocations": {
        "title": "room_id"
    },
    "explored": [],
    "unexplored": [],     // ?
    "moveHistory": []
}
*/
// if unexplored, backup, explore

