const fs = require("fs");
const mimeTypes = require("./mime-types.json");
const CONTENT_TYPE = "Content-Type";
const NOT_FOUND_404 = 404;
const htmlExtension = ".html";

const serve404NotFound = (response) => {
    response.statusCode = NOT_FOUND_404;
    response.setHeader(CONTENT_TYPE, mimeTypes[htmlExtension]);

    fs.readFile(`public/404.html`, (error, data) => {
        response.end(data);
    });
}

const serveFile = (filename, response) => {
    fs.readFile(`public${filename}`, (error, data) => {
        if(!error){
            response.end(data); 
        }else{
            serve404NotFound(response);
        }
    });
}

module.exports = {
    serveFile,
    serve404NotFound
}