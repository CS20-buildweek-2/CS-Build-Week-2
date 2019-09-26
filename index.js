require("dotenv").config();
const fs = require('fs');
const axios = require("axios");
const token = process.env.TOKEN;

function writeFile(filename, data) {
    fs.writeFile(
        filename,
        JSON.stringify(data),
        { flag: "w" },
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

async function main() {
    const init = await cooldownreq('adv/init', 'get')
    console.log(init)
    //  let player = await cooldownreq('adv/status', 'post')
    let current_room = (await cooldownreq('adv/init', 'get')).room_id
    let cooldownms = (await cooldownreq('adv/init', 'get')).cooldown * 1000
    moveplayer({"direction":"s"})
    console.log(init)
    //    console.log(init)
    //    let current_room = await cooldownreq('adv/init', 'get')
    //    test = {"test":"test"}

    //    writeFile("locations.json", [])
    // move command

}

main()