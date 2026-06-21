const path = require("path");

const ignoreList = [
    ".git"
];

const shouldIgnore = (itemPath) => {
    const base = path.basename(itemPath);
    return ignoreList.includes(base);
};

module.exports = {
    shouldIgnore
}