const express = require("express")
const mysql = require('mysql')
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended : lalse}));
app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "node_projet",
    password : "1234"
});



app.get("/api/beers", (req, res) => {

    pool.acquireConnection((err, connection) =>{
        if(err){
            res.status(502).send("Oops... An error occured when connecting to the db")
            return;
        }else{
            connection.quety("SELECT * FROM beer", (err, rows) =>{
                if(err) res.status(502).send("Oops... An error occured when fetching data from the db")
                else{
                    res.send(rows)
                }
            })
            connection.release()
        }
        
    })

});



const PORT = process.env.PORT || 5000;
app.listen(PORT, `listening on ${PORT}...`)