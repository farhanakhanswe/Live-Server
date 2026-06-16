const CONTENT_TYPE = "Content-Type";

const fileReloadState = require("./fileReloadState");
const mimeTypes = require("./mime-types.json");
const { serveFile, serve404NotFound } = require("./fileServer");
const path = require("path");

const checkIfFileChangedAPI = "/check-file-changes";

const applicatonOctetStreamStr = "application/octet-stream";
const htmlExtensionStr = ".html";
const jsonExtensionStr = ".json";
const publicDirectoryStr = "public";

// functions start here

const isSafePath = (requestPath) => {
    const publicDir = path.resolve(publicDirectoryStr);
    const requestedFile = path.resolve(publicDirectoryStr, "." + requestPath);
    console.log("publicDir: " + publicDir);
    console.log(`requested file: ${requestedFile}`);

    return requestedFile.startsWith(publicDir);
}

const setContentHeader = (ext, response) => {
    const type = mimeTypes[ext] || applicatonOctetStreamStr;
    response.setHeader(CONTENT_TYPE, type);
}

const routeRequest = (request, response) => {
    console.log(`Request URL: ${request.url}`);
    console.log(`Extension: ${path.extname(request.url)}`);

    if(request.url === checkIfFileChangedAPI){
        setContentHeader(jsonExtensionStr, response);
        response.end(JSON.stringify({
            changed: fileReloadState.getHasFileChanged()
        }));

        fileReloadState.setHasFileChanged(false);
        return;
    }else if(request.url === "/"){
        setContentHeader(htmlExtensionStr, response);
        serveFile("/index.html", response);
    }else if(isSafePath(request.url)){
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