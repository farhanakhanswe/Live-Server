const http = require("http");
const fs = require("fs");
const config = require("./config.json");
const path = require("path");
const mimeTypes = require("./mime-types.json");
const fileReloadState = require("./fileReloadState");

const CONTENT_TYPE = "Content-Type";
const NOT_FOUND_404 = 404;

const htmlExtension = ".html";
const jsonExtension = ".json";
const checkIfFileChangedAPI = "/check-file-changes";

// functions start here

const setContentHeader = (ext, response) => {
    const type = mimeTypes[ext] || "application/octet-stream";
    response.setHeader(CONTENT_TYPE, type);
}

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

const watchFiles = () => {
    fs.watch("public", (eventType, filename) => {
        console.log(eventType, filename);
        if(eventType === "change"){
            fileReloadState.setHasFileChanged(true);
        }
    });
}

const server = http.createServer((request, response) => {
    console.log(request.url);
    console.log("ext" + path.extname(request.url));

    if(request.url === checkIfFileChangedAPI){
        response.setHeader(CONTENT_TYPE, mimeTypes[jsonExtension]);

        response.end(JSON.stringify({
            changed: fileReloadState.getHasFileChanged()
        }));

        fileReloadState.setHasFileChanged(false);
        return;
    }else if(request.url === "/"){
        setContentHeader(htmlExtension, response);
        serveFile("/index.html", response);
    }else if(path.extname(request.url) !== ""){
        const fileFormat = path.extname(request.url);
        setContentHeader(fileFormat, response);
        serveFile(request.url, response);
    }else{
        serve404NotFound(response); 
    }

});

server.listen(config.port, () => {
    watchFiles();
    console.log(`Server running on port ${config.port}`);
});