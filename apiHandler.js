const { setContentHeader } = require("./setContentHeader");
const fileReloadState = require("./fileReloadState");
const jsonExtensionStr = ".json";

const fileReloadStateAPIhandler = (url, response) => {
    setContentHeader(jsonExtensionStr, response);
    response.end(JSON.stringify({
        changed: fileReloadState.getHasFileChanged()
    }));

    fileReloadState.setHasFileChanged(false);
    return;
}

module.exports = {
    fileReloadStateAPIhandler
}