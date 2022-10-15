const express = require("express")
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const app = express.Router();
require("dotenv").config();
app.use(cors())

const API_KEY = process.env.GOOGLE_API_KEY;

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10, // Limit each IP request
    message: "Too much requests"
})

app.get('/places/?:lat&:long&:radius', apiLimiter, async (req, res) => {
    const lat = req.params.lat
    const long = req.params.long
    const radius = req.params.radius;


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
    console.log(`Request Successful (lat:${lat} long:${long})`);
});


app.get('/placedetails/:place_id', apiLimiter, async (req, res) => {
    try {
        const place_ID = req.params.place_id;
        const placeDetails = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${place_ID}`)
            .then(response => response.json())
            .then(result => { return result })
            .catch(error => console.log('error', error));
        res.json(placeDetails).status(200)
        console.log(`Place Details Successful (ID:${place_ID})`);

    } catch (error) {
        console.log(error);
    }

});

module.exports = app;