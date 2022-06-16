const express = require("express");
const Logger = require("./Looger");

const App = express();
App.use(Logger);
App.use(express.static("public"));

const PORT = process.env.PORT || 5000;
App.listen(PORT, ()=>{console.log(`Listeing on ${PORT}...`)});
