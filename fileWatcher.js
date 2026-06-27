const fs = require("fs");
const path = require("path");
const publicStr = "public";
const eventTypeChangeStr = "change";
const { filesToIgnore } = require("./public/filesToIgnore");
const { filePathKeyReloadStateValueMap } = require("./filePathKeyReloadStateValueMap");

const convertFilePathToUrl = (filePath) => {
    let url = filePath.replace(publicStr, "");
    url = url.replaceAll("\\", "/");
    return url;
}

const watchDirectory = (directoryPath) => {
    console.log(`watching directory path: ${directoryPath}` );
    
    fs.watch(directoryPath, (eventType, filename) => {
        if (!filename) return;

        const fullFilePath = path.join(directoryPath, filename);
        if (filesToIgnore(fullFilePath)) return;

        console.log(`eventType: ${eventType} , directory path: ${directoryPath} , fileName: ${filename}, fullpath: ${fullFilePath}`);
        console.log(filePathKeyReloadStateValueMap);

        if(eventType === eventTypeChangeStr){
            const url = convertFilePathToUrl(fullFilePath);
            console.log(`convertFilePathToUrl: ${url}`);
            if(filePathKeyReloadStateValueMap.has(url)){
                console.log("ES");
                filePathKeyReloadStateValueMap.set(url, true);
            }
        }
        return;
    });
}

const watchDirectoriesRecursively = (directoryPath) => {
    watchDirectory(directoryPath);

    const items = fs.readdirSync(directoryPath, { withFileTypes: true});
    for(const item of items){
        const childDirectory = path.join(directoryPath, item.name);

        if (filesToIgnore(childDirectory)) continue;

        if(item.isDirectory()){
            watchDirectoriesRecursively(childDirectory);
        }
    }
}

const watchFiles = () => {
    watchDirectoriesRecursively(publicStr);
}

module.exports = {
    watchFiles
};