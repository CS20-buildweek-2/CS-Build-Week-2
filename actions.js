require("dotenv").config();
const axios = require("axios");
const token = process.env.TOKEN;

async function movement(direction) {
    let roomData = {};
    let res = {};
    try {
        res = await axios
            .create({
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            })
            // You Will need to use the initialize endpoint before you can start moving around
            .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", {
                direction: direction
            });
    } catch (err) {
        console.log(err);
    }
    // axios
    //     .create({
    //         headers: {
    //             Authorization: token,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     // You Will need to use the initialize endpoint before you can start moving around
    //     .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", {
    //         direction: direction
    //     })
    //     .then(res => {
    //         console.log(res.data);
    //         roomData = res.data;
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    roomData = res.data;
    return roomData;
}

const treasurePickup = () => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/take/", {
            name: "tiny treasure"
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const treasureDrop = () => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/", {
            name: "treasure"
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const treasureSell = () => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/", {
            name: "treasure"
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const treasureSellConfirm = () => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/", {
            name: "treasure",
            confirm: "yes"
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const examine = itemOrPlayerName => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/", {
            name: itemOrPlayerName
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const equipClothing = nameOfWearable => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/wear/", {
            name: nameOfWearable
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const nameChange = newName => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post(
            "https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/",
            {
                name: newName,
                confirm: "aye"
            }
        )
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const pray = () => {
    axios
        .create({
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        })
        .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/")
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    movement,
    treasurePickup,
    treasureDrop,
    treasureSell,
    treasureSellConfirm,
    examine,
    equipClothing,
    nameChange,
    pray
};
