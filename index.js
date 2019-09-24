require("dotenv").config();
const axios = require("axios");
const token = process.env.TOKEN;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function cooldownreq(endpoint, method, data) {
    try {
        let res = await axios({
            baseURL: 'https://lambda-treasure-hunt.herokuapp.com/api/',
            headers: { Authorization: `Token ${process.env.TOKEN}` },
            method: `${method}`,
            url:  `${endpoint}`,
            data: `${data}`
        });
        await sleep(res.cooldown * 1000)
        console.log(res)
      } catch (err) {

        console.error(err)
      }
}

function main(){cooldownreq("adv/init/","get")}

main()