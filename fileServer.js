const fs = require("fs");
const mimeTypes = require("./mimeTypes.json");
const CONTENT_TYPE = "Content-Type";
const NOT_FOUND_404 = 404;
const NOT_FOUND_404_FILE_PATH = `public/404.html`;
const htmlExtension = ".html";
const pollingScriptPath = `<script src="/polling.js"></script>`;

const pollingScriptInjection = (data) => {
    let html = data.toString();
    const script = pollingScriptPath;
    const hasPollingScriptSrc = html.includes('src="/polling.js"');
    const hasBody = /<\/body>/i.test(html);

    if (!hasPollingScriptSrc) {
        if (hasBody) {
            html = html.replace(/<\/body>/i, script + "</body>");
        } else {
            html += script;
        }
    }
    
    return html;
}

const serve404NotFound = (response) => {
    response.statusCode = NOT_FOUND_404;
    response.setHeader(CONTENT_TYPE, mimeTypes[htmlExtension]);

    fs.readFile(NOT_FOUND_404_FILE_PATH, (error, data) => {
        response.end(data);
    });
}

const serveFile = (fileName, fileExtension, response) => {
    fs.readFile(`public${fileName}`, (error, data) => {
        if(!error){
            if(fileExtension === htmlExtension){
                const html = pollingScriptInjection(data);
                response.end(html);
            }else{
                response.end(data); 
            }
        }else{
            serve404NotFound(response);
        }
    });
}

module.exports = {
    serveFile,
    serve404NotFound
}