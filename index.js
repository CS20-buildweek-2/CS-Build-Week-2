require("dotenv").config();
const fs = require('fs');
const axios = require("axios");
const token = process.env.TOKEN;

function writeFile(filename, data) {
    fs.writeFile(
        filename,
        JSON.stringify(data),
        { flag: "a" },
        function (err) {
            if (err) {
                return console.log(err);
            }
        }
    )
}

async function moveplayer(direction) {
    let res = await cooldownreq('adv/move/', 'post', direction)
    await sleep(res.cooldown * 1000)
    return console.log(res)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

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

// clear file store
function clearStore() {
    writeFile("config.json", {})
}

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
async function initstate() {
    const init = await cooldownreq('adv/init', 'get')
    delete init["description"] // the description ruints the table
    console.table(init)
    playerstate()
}

// Print player state
async function playerstate() {
    var player = (await cooldownreq('adv/status', 'post'))
    console.table(player)
}

// Player commands
function commandlist(){
    var commands = JSON.parse(fs.readFileSync('commands.json', 'utf-8'))
    console.table(commands)
}

async function main() {
    commandlist()

}

main()