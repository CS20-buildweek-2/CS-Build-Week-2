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
        //        console.log(res.data)
        res = await res.data
        await sleep(res.cooldown * 1000)
        return res
    } catch (err) {
        console.error(err)
    }
}

async function main() {
    //    const init = await cooldownreq('adv/init', 'get')
    //    console.log(init)
    //    const player = await callEndpointAfterCD('adv/status', 'post')
    //    let current_room = await callEndpointAfterCD('adv/init', 'get')

    //    let current_room = await cooldownreq('adv/init', 'get')
    test = {"test":"test"}
    writeFile("test.json", test)


}
main()