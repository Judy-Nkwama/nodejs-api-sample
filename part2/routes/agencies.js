const express = require("express")
const agenciesRoute = express.Router()

agenciesRoute.get("/", (req, res) => {
    res.send("All the agencies...")
})

agenciesRoute.get("/:id", (req, res) => {
    res.send(`Agency of id : ${req.params.id}`);
})

module.exports = agenciesRoute;