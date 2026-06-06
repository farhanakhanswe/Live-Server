let hasFileChanged = false;

module.exports = {
    getHasFileChanged: () => hasFileChanged,
    setHasFileChanged: (value) => {
        hasFileChanged = value;
    }
}