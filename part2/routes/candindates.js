const express = require("express");
const candidatesRoute = express.Router();

candidatesRoute.get("/", (req, res) => {
    res.send("All the Candidates...");
})

candidatesRoute.get("/:id", (req, res) => {
    res.send(`Candidate with id : ${req.params.id}`);
})

module.exports = candidatesRoute;