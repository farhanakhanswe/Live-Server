const http = require("http");
const fs = require("fs");
const config = require("./config.json");
const port = config.port;
const path = require("path");
const htmlExt = ".html";
const contentHeaders = require("./content-headers.json");
const contentHeaderMap = new Map(Object.entries(contentHeaders));

// functions start here

const setContentHeader = (ext, response) => {
    response.setHeader("Content-Type", contentHeaderMap.get(ext));
}

const serveFile = (filename, response) => {
    fs.readFile(`public${filename}`, (error, data) => {
        if(!error){
            response.end(data); 
        }else{
            response.statusCode = 404;
            response.end("File not found!");
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
        setContentHeader(htmlExt, response);
        serveFile("/index.html", response);
    }else{
        const fileFormat = path.extname(request.url);
        setContentHeader(fileFormat, response);
        serveFile(request.url, response);
    } 
});

server.listen(port, () => {
    watchFiles();
    console.log(`Server running on port ${port}`);
});