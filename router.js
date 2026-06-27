const path = require("path");
const { requestRules } = require("./requestRules");
const { filePathKeyReloadStateValueMap } = require("./filePathKeyReloadStateValueMap");
const checkIfFileChangedAPISubstring = "/check-file-changes/filename=http://localhost:3000";

const router = (request, response) => {
    console.log(`Request URL: ${request.url}`);
    // console.log(`Extension: ${path.extname(request.url)}`);

    if(!filePathKeyReloadStateValueMap.has(request.url) &&  !(request.url.includes(checkIfFileChangedAPISubstring))){
        if(request.url === "/"){
           filePathKeyReloadStateValueMap.set("/index.html", false);
        }else{
           filePathKeyReloadStateValueMap.set(request.url, false);
        }
    }
    requestRules(request.url, response);
}
    
module.exports = {
    router
}