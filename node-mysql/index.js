const http = require("http");

const options = {
    hostname : "localhost",
    port : 8000,
    protocol : "http:",
    path : "/sys_data_children",
    headers : {
        "content-type" : "application/json"
    }
};

const request = http.get("http://localhost:8000/sys_data_children");

let data = "";

request.on("response", response => {
    response.on("data", chunck => {
        data += chunck;
    });
    response.on("end", () => {
        console.log(JSON.parse(data));
    });

    response.on("error", err => {
        console.log(`An Error occured : ${err.message}`);
    });
});

request.on("error", err => {
    console.log(`An Error occured : ${err.message}`);
});