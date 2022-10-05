const express = require("express")
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const app = express.Router();
const dotenv = require("dotenv")
app.use(cors())
dotenv.config();

const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 5 sec
    max: 1, // Limit each IP to 1 requests per `window` (here, per 15 minutes)
    message: "Allowed only 1Request/5sec"
})

app.get('/places/?:lat&:long&:radius', apiLimiter, async (req, res) => {
    const lat = req.params.lat
    const long = req.params.long
    const radius = req.params.radius;


    const API_KEY = "AIzaSyD9nm-ZJfvjQHtZl1tXDsBAD89tqGr860c";
    const restaurantsResult = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${lat}%2C${long}&radius=${radius}&key=${API_KEY}`)
        .then((res) => res.json())
        .then((result) => { return (result.results) })
        .catch((err) => {
            console.log(err);
        });
    const barResults = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=bar&location=${lat}%2C${long}&radius=${radius}&key=${API_KEY}`)
        .then((res) => res.json())
        .then((result) => { return (result.results) })
        .catch((err) => {
            console.log(err);
        });

    const finalResult = [...restaurantsResult, ...barResults]

    res.json(finalResult).status(200)
    console.log("Request Successful");
});

module.exports = app;