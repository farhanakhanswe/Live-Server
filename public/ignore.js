const path = require("path");

const ignoreList = [
];

const shouldIgnore = (itemPath) => {
    const base = path.basename(itemPath);
    return ignoreList.includes(base);
};

module.exports = {
    shouldIgnore
}