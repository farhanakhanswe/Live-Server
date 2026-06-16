const { apiHandler } = require("./apiHandler");
const { fileHandler } = require("./fileHandler");

const requestRules = (routesMap, url, response) => {
    if(routesMap.get(url)){
        const handler = routesMap.get(url);
        return handler(url, response);
    }else{
        return fileHandler(url, response);
    }
}

module.exports = {
    requestRules
}