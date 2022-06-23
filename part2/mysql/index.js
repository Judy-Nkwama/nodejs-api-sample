const express = require("express")
const app = express()
const bodyParser = require("body-parser")

//3rd party middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
const BeersRouter = require("./BeersRouter")

//responders
app.use("/api/beers", BeersRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))