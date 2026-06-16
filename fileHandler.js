const path = require("path");
const htmlExtensionStr = ".html";
const publicDirectoryStr = "public"
const { setContentHeader } = require("./setContentHeader");
const { serveFile, serve404NotFound } = require("./fileServer");

const isSafePath = (requestPath) => {
    const publicDir = path.resolve(publicDirectoryStr);
    const requestedFile = path.resolve(publicDirectoryStr, "." + requestPath);
    console.log("publicDir: " + publicDir);
    console.log(`requested file: ${requestedFile}`);

    return requestedFile.startsWith(publicDir);
}

const fileHandler = (url, response) => {
    if(url === "/"){
        setContentHeader(htmlExtensionStr, response);
        serveFile("/index.html", response);
    }else if(isSafePath(url)){
        const fileFormat = path.extname(url);
        setContentHeader(fileFormat, response);
        serveFile(url, response);
    }else{
        serve404NotFound(response); 
    }
}

module.exports = {
    fileHandler
}