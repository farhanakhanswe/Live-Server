const fs = require("fs");
const fileReloadState = require("./fileReloadState");

const watchFiles = () => {
    console.log("watching files");
    fs.watch("public", (eventType, filename) => {
        console.log(eventType, filename);
        if(eventType === "change"){
            fileReloadState.setHasFileChanged(true);
        }
    });
}

module.exports = {
    watchFiles
};