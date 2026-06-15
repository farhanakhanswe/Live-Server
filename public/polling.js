console.log("from polling.js");

const checkFileChange = () => {
    fetch("/check-file-changes")
        .then(res => res.json())
        .then(data => {
            if(data.changed){
                location.reload();
            };
        });
};

setInterval(checkFileChange, 1000);


