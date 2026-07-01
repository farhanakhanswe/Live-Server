const { fileReloadStateAPIhandler } = require("./handlers/fileReloadStateAPIhandler");
const { fileHandler } = require("./handlers/fileHandler");
const { convertUrlToFilePath } = require('./convertUrlToFilePath');
const { filePathKeyReloadStateValueMap } = require("./filePathKeyReloadStateValueMap");
const checkIfFileChangedAPISubstring = "/check-file-changes/filename=http://localhost:3000";

const requestRules = (url, response) => {
    if(url.includes(checkIfFileChangedAPISubstring)){
        const filepath = convertUrlToFilePath(url);

        if(filepath === "/"){
            return fileReloadStateAPIhandler("/index.html", response);
        }else{
            return fileReloadStateAPIhandler(filepath, response);
        }
        
        console.log("converted filepath: " + filepath);
    }else{
        return fileHandler(url, response);
    }
}

module.exports = {
    requestRules
}