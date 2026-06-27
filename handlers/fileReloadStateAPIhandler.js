const { setContentHeader } = require("../setContentHeader");
const jsonExtensionStr = ".json";
const { filePathKeyReloadStateValueMap } = require("../filePathKeyReloadStateValueMap");

const fileReloadStateAPIhandler = (filepath, response) => {
    setContentHeader(jsonExtensionStr, response);
    const fileReloadState = filePathKeyReloadStateValueMap.get(filepath);
    console.log(`url from fileReloadStateAPIhandler handler: ${filepath}`);
    console.log(`fileReloadState: ${fileReloadState}`);

    response.end(JSON.stringify({
        changed: fileReloadState
    }));

    if(fileReloadState){ 
        filePathKeyReloadStateValueMap.set(filepath, false);
    }
    
    return;
}

module.exports = {
    fileReloadStateAPIhandler
}