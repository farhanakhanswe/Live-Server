const fs = require("fs");
const path = require("path");
const fileReloadState = require("./fileReloadState");

const watchDirectory = (directoryPath) => {
    console.log(`watching directory path: ${directoryPath}` );

    fs.watch(directoryPath, (eventType, filename) => {
        console.log(`eventType: ${eventType} and fileName: ${filename}`);
        if(eventType === "change"){
            fileReloadState.setHasFileChanged(true);
        }
    });
}

const watchDirectoriesRecursively = (directoryPath) => {
    watchDirectory(directoryPath);

    const items = fs.readdirSync(directoryPath, { withFileTypes: true});
    for(const item of items){
        if(item.isDirectory()){
            const childDirectory = path.join(directoryPath, item.name);
            watchDirectoriesRecursively(childDirectory);
        }
    }
}

const watchFiles = () => {
    watchDirectoriesRecursively("public");
}

module.exports = {
    watchFiles
};