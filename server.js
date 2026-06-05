const http = require("http");
const fs = require("fs");
const config = require("./config.json");
const path = require("path");
const mimeTypes = require("./mime-types.json");

const htmlExtension = ".html";
const fileNotFoundStatusCode = 404;
const fileNotFoundMsg = "File not found!";

// functions start here

const setContentHeader = (ext, response) => {
    response.setHeader("Content-Type", mimeTypes[ext]);
}

const serveFile = (filename, response) => {
    fs.readFile(`public${filename}`, (error, data) => {
        if(!error){
            response.end(data); 
        }else{
            response.statusCode = fileNotFoundStatusCode;
            response.end(fileNotFoundMsg);
        }
    });
}

const watchFiles = () => {
    fs.watch("public", (eventType, filename) => {
        console.log(eventType, filename);
    });
}

const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.url === "/"){
        setContentHeader(htmlExtension, response);
        serveFile("/index.html", response);
    }else{
        const fileFormat = path.extname(request.url);
        setContentHeader(fileFormat, response);
        serveFile(request.url, response);
    } 
});

server.listen(config.port, () => {
    watchFiles();
    console.log(`Server running on port ${config.port}`);
});