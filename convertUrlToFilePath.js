const checkIfFileChangedAPISubstring = "/check-file-changes/filename=http://localhost:3000";

const convertUrlToFilePath = (url) => {
    const filePath = url.replace(checkIfFileChangedAPISubstring, "");
    return filePath;
}

module.exports = {
    convertUrlToFilePath
}