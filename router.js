const CONTENT_TYPE = "Content-Type";

const fileReloadState = require("./fileReloadState");
const { serveFile, serve404NotFound } = require("./fileServer");

const checkIfFileChangedAPI = "/check-file-changes";

const mimeTypes = require("./mime-types.json");
const applicatonOctetStream = "application/octet-stream";

const htmlExtension = ".html";
const jsonExtension = ".json";

const path = require("path");

const isSafePath = (requestPath) => {
    const publicDir = path.resolve("public");
    const requestedFile = path.resolve("public", "." + requestPath);
    console.log("publicDir" + publicDir);
    console.log(`requested file ${requestedFile}`);

    return requestedFile.startsWith(publicDir);
}

const setContentHeader = (ext, response) => {
    const type = mimeTypes[ext] || applicatonOctetStream;
    response.setHeader(CONTENT_TYPE, type);
}

const routeRequest = (request, response) => {
    console.log(`Request URL: ${request.url}`);
    console.log(`Extension: ${path.extname(request.url)}`);

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
        if (!isSafePath(request.url)) {
            serve404NotFound(response);
            return;
        }
        const fileFormat = path.extname(request.url);
        setContentHeader(fileFormat, response);
        serveFile(request.url, response);
    }else{
        serve404NotFound(response); 
    }
}
    
module.exports = {
    routeRequest
}