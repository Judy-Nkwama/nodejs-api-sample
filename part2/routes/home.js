const express = require("express");
const homeRoute = express.Router();

homeRoute.get("/", (req, res) =>{
    res.header({"content-type": "text/html"})
    res.send("<h1>welcome to the POTO server!!!</h1>Send to : <ul><li>Candindates : For fetching Agencies</li> <li>Agencies : to fetch agencies</li><ul>");
});

module.exports = homeRoute;