require("dotenv").config();
const axios = require("axios");
const token = process.env.TOKEN;

axios
    .create({
        headers: {
            // Authorization: "ADD YOUR TOKEN HERE!",
            "Content-Type": "application/json"
        }
    })
    .post("https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", {
        direction: "n"
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
