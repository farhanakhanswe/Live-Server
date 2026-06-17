const path = require("path");
const fileReloadState = require("./fileReloadState");
const { fileReloadStateAPIhandler } = require("./apiHandler");
const mimeTypes = require("./mimeTypes.json");
const { requestRules } = require("./requestRules");
const checkIfFileChangedAPI = "/check-file-changes";
const routesMap = new Map();

// routes
routesMap.set(checkIfFileChangedAPI, fileReloadStateAPIhandler);

// functions
const routeRequest = (request, response) => {
    console.log(`Request URL: ${request.url}`);
    console.log(`Extension: ${path.extname(request.url)}`);

    requestRules(routesMap, request.url, response);
}
    
module.exports = {
    routeRequest
}