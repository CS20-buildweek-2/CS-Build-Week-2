require("dotenv").config();
const axios = require("axios");
const token = process.env.TOKEN;

axios
    .create({
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    })
    // You Will need to use the initialize endpoint before you can start moving around
    .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", {
        direction: "s"
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
