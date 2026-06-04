const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((request, response) => {
    if(request.url === "/"){
       fs.readFile("public/index.html", (error, data) => {
            response.end(data);
       });
    } 
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});