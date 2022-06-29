const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mysql = require("mysql")

//Configs
const config = require("./config")
const pool = mysql.createPool(config)

//3rd party middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
const BeersRouterFc = require("./BeersRouter")
const userRouterFc = require("./UsersRouter")

//responders
app.use("/api/beers", BeersRouterFc(pool) )
app.use("/api/users", userRouterFc(pool))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))