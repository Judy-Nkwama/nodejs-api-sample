//Server Side
const http = require("http");
const dummyData = {
    workers : [
        {name : "Anisse", age : 19, position: "Manager"},
        {name : "Boubou", age : 19, position: "Odit"},
        {name : "Jeroi", age : 20, position: "Cashier"}
    ],
    customers : [
        {name : "Carl", age : 12, isPremium: false},
        {name : "Bill", age : 50, isPremium: true},
        {name : "Houston", age : 25, isPremium: true}
    ]
};

//1) ----- USING REQUEST EVENT TO RESPOND TO GET RESQUEST FROM APLLICATIONS

/* Since the "request" event is the defaulte one. We dont need to listen to manually. Here, we could also use the callback function we have used when listenig to the "resquest" directly as the callback of createServer() method and the resut would be the same. In that case we would have needed the server object only for starting to listen with server.listen or listening to the clientError event */

const server = http.createServer();

server.on("request", (request, response) => {
    //we can use the resquest.url or the path to get details 
    if(/^\/customers/.test(request.url)){
        response.writeHead(200,{
            "content-type" : "application/json"
        });
        response.write(JSON.stringify(dummyData.customers));
    }else if(/^\/workers/.test(request.url)){
        response.writeHead(200,{
            "content-type" : "application/json"
        });
        response.write(JSON.stringify(dummyData.workers));
    }else{
        response.writeHead(400,{
            "content-type" : "application/json"
        });
        response.write(JSON.stringify({}));
    }
    response.end();
    console.log("response sent to an app...");
});

//2) ---- USING CONNECTION EVENT TO RESPOND WHENEVER SOME BROWSES THE URL WE ARE LISTENING TO 

server.on("connection", ( socket ) => {
    console.log("response sent to the web...");
});

//Error management
server.on("clientError", err => {
    console.log(`Error occured : ${err.message}`);
});

//Let now start listening to resquest (awaiting requests)
server.listen(8000);

console.log("Listening on 8000 port...");