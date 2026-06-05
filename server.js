const http = require("http");
const fs = require("fs");
const port = 3000;
const path = require("path");
const htmlExt = ".html";
const contentHeaderMap = new Map()
    .set(".html", "text/html")
    .set(".css", "text/css")
    .set(".js", "text/javascript")
    .set(".csv", "text/csv")
    .set(".txt", "text/plain")

    .set(".png", "image/png")
    .set(".jpg", "image/jpeg")
    .set(".jpeg", "image/jpeg")
    .set(".gif", "image/gif")
    .set(".svg", "image/svg+xml")
    .set(".webp", "image/webp")
    .set(".ico", "image/x-icon")
   
    .set(".json", "application/json")
    .set(".xml", "application/xml")
    .set(".pdf", "application/pdf")

    .set(".mp3", "audio/mpeg")
    .set(".mpeg", "audio/mpeg")
    .set(".wav", "audio/wav")

    .set(".mp4", "video/mp4")
    .set(".webm", "video/webm")

// functions start here

const setContentHeader = (ext, response) => {
    response.setHeader("Content-Type", contentHeaderMap.get(ext));
}

const serveFile = (filename, response) => {
    fs.readFile(`public${filename}`, (error, data) => {
        if(!error){
            response.end(data); 
        }else{
            response.statusCode = 404;
            response.end("File not found!");
        }
    });
}

const watchFiles = () => {
    fs.watch("public", (eventType, filename) => {
        console.log(eventType, filename);
    });
}

const server = http.createServer((request, response) => {
    console.log(request.url);
    if(request.url === "/"){
        setContentHeader(htmlExt, response);
        serveFile("/index.html", response);
    }else{
        const fileFormat = path.extname(request.url);
        setContentHeader(fileFormat, response);
        serveFile(request.url, response);
    } 
});

server.listen(port, () => {
    watchFiles();
    console.log(`Server running on port ${port}`);
});