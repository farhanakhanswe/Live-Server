const fs = require("fs");
const path = require("path");
const fileReloadState = require("./fileReloadState");
const { shouldIgnore } = require("./public/ignore");

const watchDirectory = (directoryPath) => {
    console.log(`watching directory path: ${directoryPath}` );
    
    fs.watch(directoryPath, (eventType, filename) => {
        if (!filename) return;

        const itemPath = path.join(directoryPath, filename);
        if (shouldIgnore(itemPath)) return;

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
        const childDirectory = path.join(directoryPath, item.name);

        if (shouldIgnore(childDirectory)) continue;

        if(item.isDirectory()){
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