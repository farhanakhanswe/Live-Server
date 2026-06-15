const http = require("http");
const config = require("./config.json");

const { watchFiles } = require("./fileWatcher");
const { routeRequest } = require("./router");

// functions start here

const server = http.createServer((request, response) => {
    routeRequest(request, response);
});

server.listen(config.port, () => {
    watchFiles();
    console.log(`Server running on port ${config.port}`);
});