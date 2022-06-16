//Api ornegi
const http = require("http");
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit : 10,
    host : "localhost",
    user : "root",
    password : "1234",
});

const server = http.createServer();

server.on("request", (request, response) => {
    const table = request.url.replace(/^\//,"");
    
    if(table.length == 0){
        response.writeHead(400, {"content-type" : "text/html"});
        response.write("No data found, check the url please");
        response.end();
    }else{
        pool.getConnection((error, connection) => {
            if(error){
                response.writeHead(200, {"content-type" : "text/html"});
                response.write(`An Error occured when resolving your request. PoolError : ${error.message}`);
                response.end();
            }else{
                connection.changeUser({database : "todoapp"});
                connection.query(`SELECT * FROM ${table}`, (error, result, fileds) => {
                    if(error){
                        response.writeHead(200, {"content-type" : "text/html"});
                        response.write(`An Error occured when resolving your request. QueryError : ${error.message}`);
                        response.end();
                    }else{
                        response.writeHead(200, {"content-type" : "application/json"});
                        response.write(JSON.stringify(result));
                        response.end();
                        console.log("response sent to an app...");
                    }
                });
                connection.release();
            }
        });
    }
});

server.on("clientError", error => {
    console.log(`There wass an error when trying to resolve one of the requests. clientError : ${error.message}`);
});

server.listen(8000);
console.log("Listenig on port 8000...");