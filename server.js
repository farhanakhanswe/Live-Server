const http = require("http");
const config = require("./config.json");
const { watchFiles } = require("./fileWatcher");
const { router } = require("./router");

const server = http.createServer((request, response) => {
    router(request, response);
});

server.listen(config.port, () => {
    watchFiles();
    console.log(`Server running on port ${config.port}`);
});