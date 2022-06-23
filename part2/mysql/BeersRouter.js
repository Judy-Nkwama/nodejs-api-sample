const express = require("express")
const beersRouter = express.Router()
const joi = require("joi")

const mysql = require("mysql")
const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'node_projet'
});

beersRouter.get("", (req, res)=>{

    pool.getConnection(( err, connection ) => {
        if(err) res.status(504).send("An internal error occured when connecteint to the DataBase")
        else{
            connection.query("SELECT * FROM beer", (err, rows) => {
                if(err) res.status(504).send("An internal error occured when fetching data from the DataBase")
                else{
                    res.send(rows)
                }
                //releasing the connection object after we are done with it
                connection.release()
            })
        }
    })

})

beersRouter.get("/:id", (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) res.status(504).send("An internal error occured when fetching data from the DataBase")
        else{

            //Verifying cheking the format validity of the request id with Joi
            const schema = joi.object({
                id : joi.number().integer().min(1)
            })
            const reqParam = schema.validate({id : req.params.id})

            if(!reqParam.error){
                const {id} = reqParam.value;
                connection.query(`SELECT * FROM beer WHERE id=${id}`, (err, rows) => {
                    if(err) res.status(504).send("An internal error occured when fetching data from the DataBase")
                    else{
                        if(rows.length < 1 )res.status(404).send("404 No ressource correspondint to the id provided")
                        else res.send(rows)
                    }
                })
            }else{
                res.status(400).send(`400 Incorrect Id format. ${reqParam.error.message}`)
            }

            //releasing the connection object after we are done with it
            connection.release()
        }
    })
})


module.exports = beersRouter;