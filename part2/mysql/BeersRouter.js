
/* NB: Once you are done with the conection object, before even comsuming the 
data first release the connection object */

const express = require("express")
const beersRouter = express.Router()
const joi = require("joi")


const beersRouterfc = pool => {

    //GET requests --------
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
                //Validating with synchronous validation function
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

    //POST requests----------
    beersRouter.post("/", (req, res) => {
        pool.getConnection( async function(err, connection){
            if(err) res.status(504).send("An internal error occured when connecting to the DataBase")
            else{

                //Validating the ressource
                const schema = joi.object({
                    name : joi.string().min(1).max(45).required(),
                    tagline : joi.string().min(1).max(255).required(),
                    description : joi.string().min(1).max(255).required()
                })

                try{
                    //Validating using Asynchronous Validation
                    const newRessource = await schema.validateAsync(req.body)
                    const { name, tagline, description } = newRessource
                    const ressourceArray = [name, tagline, description]
                    const queryString = "INSERT INTO beer(name, tagline, description) VALUES(?,?,?)"

                    //Adding the new ressource to the db
                    connection.query(queryString, ressourceArray, (err, insertedRowDetays) => {

                        //Releasing the connection Object before sending and closing the request
                        connection.release()

                        if(err){
                            res.status(400).send(`An internal error occured when inserting the ressource in the DataBase :  ${err.message}`)
                        }
                        //Sending the insert ID
                        else res.send(insertedRowDetays)
                    })

                }catch(err){
                    //Releasing the connection Object before sending and closing the request
                    connection.release()
                    res.status(400).send(`Incorect request body : ${err}`)
                }
                
            }
        })
    })

    //PUT request------
    beersRouter.put("/:id", (req, res) => {
        pool.getConnection(async function(err, connection){
            
            
            if(err) res.status(504).send("An internal error occured when fetching data from the DataBase")
            else{

                //Verifying cheking the format validity of the request id with Joi

                try{

                    const schema = joi.object({
                        id : joi.number().integer().min(1)
                    })
                    //Validating id with synchronous validation function
                    const id = ( await schema.validateAsync({id : req.params.id}) ).id;

                    //Checking if there's a ressouce conresponding to the provided id
                    connection.query(`SELECT * FROM beer WHERE id=${id}`, async  function(err, rows){
                        if(err){
                            connection.release();
                            res.status(504).send("An internal error occured when fetching data from the DataBase")
                        }
                        else{
                            if(rows.length < 1 ){
                                connection.release();
                                res.status(404).send("404 No ressource correspondint to the id provided")
                            }
                            else{
                                //Updating process

                                //Validating the body using Asynchronous Validation
                                const schema = joi.object({
                                    name : joi.string().min(1).max(45).required(),
                                    tagline : joi.string().min(1).max(255).required(),
                                    description : joi.string().min(1).max(255).required()
                                })
                                
                                try{
                                    const newRessource = await schema.validateAsync(req.body)
                                    const { name, tagline, description } = newRessource
                                    const ressourceArray = [name, tagline, description]
                                    const queryString = `UPDATE beer SET name=?, tagline=?, description=?, lastMoodified=NOW() WHERE id=${id}`

                                    //Adding the new ressource to the db
                                    connection.query(queryString, ressourceArray, (err, updatedRowDetays) => {

                                        //Releasing the connection Object before sending and closing the request
                                        connection.release()

                                        if(err){
                                            res.status(400).send(`An internal error occured when inserting the ressource in the DataBase :  ${err.message}`)
                                        }
                                        //Sending the insert ID
                                        else res.send(updatedRowDetays)
                                    })
                                }catch(err){
                                    connection.release()
                                    res.status(400).send(`An internal error occured when inserting the ressource in the DataBase :  ${err.message}`)
                                }
                                
                            }
                        }
                    })

                }catch(err){
                    res.status(400).send(`An error occured : ${err.message}`)
                }

            }
            
        })
    })

    return beersRouter
}

module.exports = beersRouterfc