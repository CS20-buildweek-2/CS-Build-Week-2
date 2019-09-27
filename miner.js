require('dotenv').config()
const axios = require("axios");
const token = process.env.TOKEN;
const shajs = require('sha.js')

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

async function mine(parameter) {
    var mine = (await cooldownreq('bc/mine/', 'post', 'parameter'))
    return mine
}
async function get_last_proof() {
    var get_last_proof = (await cooldownreq('bc/last_proof/', 'get'))
    return get_last_proof
}
async function get_balance() {
    var get_balance = (await cooldownreq('bc/get_balance/', 'get'))
    return get_balance
}

function validate_proof(last_proof, proof, difficulty) {
  let hash = shajs('sha256')
    .update(`${last_proof}${proof}`)
    .digest('hex')
  return hash.substring(0, difficulty) === '0'.repeat(difficulty)
}

// Miner
async function main() {
  while (true) {
    let last_block = await get_last_proof()
    let last_proof = parseInt(last_block.proof)
    let difficulty = last_block.difficulty
    let proof = last_proof
    let is_valid = false

    console.log(`Check Proof`)
    while (!is_valid) {
      proof += 1
      is_valid = validate_proof(last_proof, proof, difficulty)
    }
    console.log(`Proof is ${proof}`)

    let attempt = await mine({"proof":`${proof}`})

    if (attempt.status === 200) {
      console.log(`Lambda Coin Mined successfully!`)
    }

    break
  }
}
// get_balance()
main()
