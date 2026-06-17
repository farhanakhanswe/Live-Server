const fs = require("fs");
const mimeTypes = require("./mimeTypes.json");
const CONTENT_TYPE = "Content-Type";
const NOT_FOUND_404 = 404;
const NOT_FOUND_404_FILE_PATH = `public/404.html`;
const htmlExtension = ".html";

const serve404NotFound = (response) => {
    response.statusCode = NOT_FOUND_404;
    response.setHeader(CONTENT_TYPE, mimeTypes[htmlExtension]);

    fs.readFile(NOT_FOUND_404_FILE_PATH, (error, data) => {
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