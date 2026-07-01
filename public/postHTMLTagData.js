const browserUrl = window.location.href;
const htmlDependenciesMappingAPI = "/v1/html-dependencies-mapping";
const links =  document.getElementsByTagName("link");
const scripts = document.getElementsByTagName("script");
const cssLinks = [];
const scriptLinks = [];
const cssExt = ".css";
const jsExt = ".js";

for(let i = 0; i < links.length ; i++){
    const fileName = links[i].href.split('/').pop().toLowerCase();
    if(fileName.endsWith(cssExt)){
        cssLinks.push(links[i].href)
    }
}

for(let i = 0; i < scripts.length ; i++){
    const fileName = scripts[i].src.split('/').pop().toLowerCase();
    if(fileName.endsWith(jsExt)){
        scriptLinks.push(scripts[i].src)
    }
}

const payload = {
    "browserUrl": browserUrl,
    "links": cssLinks,
    "scripts": scriptLinks
}

console.log(payload);

async function postHTMLTagData(){
    try{
        const response = await fetch(htmlDependenciesMappingAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error(`Error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Success: ", result );
    }catch(error){
        console.log("Error: ", error);
    }
}




