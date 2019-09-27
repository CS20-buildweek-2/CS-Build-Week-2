require('dotenv').config()
const axios = require('axios')
const shajs = require('sha.js')
const token = process.env.TOKEN;


// Helper functions
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

function validate_proof(last_proof, proof, difficulty) {
    let hash = shajs('sha256')
        .update(`${last_proof}${proof}`)
        .digest('hex')
    return hash.substring(0, difficulty) === '0'.repeat(difficulty)
}

// Miner
async function main() {
    while (true) {
        let last_block = await cooldownreq('bc/last_proof', 'get')
        let last_proof = parseInt(last_block.proof)
        let difficulty = last_block.difficulty
        let proof = last_proof
        let is_valid = false

        console.log(`Validating proof`)
        while (!is_valid) {
            proof += 1
            is_valid = validate_proof(last_proof, proof, difficulty)
        }
        console.log(`Finished validating. Proof is ${proof}`)

        let mine = await cooldownreq('bc/mine', 'post', {
            proof
        })


        if (mine.status === 200) {
            console.log(`Mined Coin successfully!`)
        }

        break
    }
}

main()
