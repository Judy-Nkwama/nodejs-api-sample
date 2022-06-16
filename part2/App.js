const express = require("express");
const Logger = require("./Logger");
const agenciesRoute = require("./routes/agencies");
const candidatesRoute = require("./routes/candindates");
const homeRoute = require("./routes/home");

const App = express();
App.use(Logger);
App.use(express.static("public"));

App.use("/candindates", candidatesRoute);
App.use("/agencies", agenciesRoute);
App.use("/", homeRoute);

const PORT = process.env.PORT || 5000;
App.listen(PORT, ()=>{console.log(`Listening on ${PORT}...`)});
//This is just a comment line to test gitHub feature
