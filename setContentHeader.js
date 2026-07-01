const CONTENT_TYPE = "Content-Type";
const applicatonOctetStreamStr = "application/octet-stream";
const mimeTypes = require("./mimeTypes.json");

const setContentHeader = (ext, response) => {
    const type = mimeTypes[ext] || applicatonOctetStreamStr;
    response.setHeader(CONTENT_TYPE, type);
}

module.exports = {
    setContentHeader
}