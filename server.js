const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((request, response) => {
    if(request.url === "/"){
        serveFile("/index.html", response);
    }else{
        serveFile(request.url, response);
    } 
});

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


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});