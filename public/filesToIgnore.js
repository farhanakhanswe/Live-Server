const path = require("path");

const ignoreList = [
    
];

const filesToIgnore = (itemPath) => {
    const base = path.basename(itemPath);
    return ignoreList.includes(base);
};

module.exports = {
    filesToIgnore
}