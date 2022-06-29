const express = require("express")
const userRouter = express.Router()

const userRouterFc = pool => {

    userRouter.post("/", (req, res) => {
        pool.getConnection( async function(err, connection){
            if(err) res.status(504).send("An internal error occured when connecting to the DataBase")
            else{

                //Validating the ressource
                const schema = joi.object({
                    name : joi.string().min(1).max(45).required(),
                    email : joi.string().min(1).max(255).required(),
                    password : joi.string().min(1).max(255).required()
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


    return userRouter
}



module.exports = userRouterFc