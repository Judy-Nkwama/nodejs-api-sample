const http = require("http");

const options = {
    agent : undefined,
    hostname : "localhost",
    method : "GET",
    path : "/customers",
    port : 8000,
    protocol : "http:"
};

let result = "";

/* Not that when using get method we can set the callback function as the second parameter of the get() methor or use tha
same callback function as the callback of the "response" event. Then specifying a url or an options object or both of the would be enough */

const request = http.get("http://localhost:8000/workers");
//1) Once there a response from the server, Managing it here 
request.on("response", response => {
    //a)Reading all the data as long as there still are availlable data. We could also use the "reading" event alternatively
    response.on("data", data => {
        result += data;
    });
    //b)Once there nolonger data to read, then comsume the response
    response.on("end", () => {
        console.log(JSON.parse(result));
    });
    //c) Anytime something goes wrong, handle it here.
    response.on("error", err => {
        console.log(`An Error occured : ${err.message}`);
    });
});

//2) Or if instead there is an Error, handling that error here
request.on("error", err => {
    console.log(`An Error occured : ${err.message}`);
});

// if we used the request() method instead get() we would need to call the request.end(); to close the request