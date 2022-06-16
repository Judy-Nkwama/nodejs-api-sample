const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    database : "todoapp"
});

connection.connect( error => {
    if(error){
        throw error;
    }
});

const statement = `INSERT INTO todos (title, completed) VALUES(?,?)`;
const statement2 = `INSERT INTO todos (title, completed) VALUES("Study Node + MySql", true)`;
const value = ["Study Batadases", false];


connection.query(statement, value, (error, result, fileds) => {
    if(error){
        throw error;
    }
    console.log(result.insertId);
});

connection.query(statement2, (error, result, fileds) => {
    if(error){
        throw error;
    }
    console.log(result.insertId);
});

connection.end();
