
const vote = (item, direction) => {
    let tally = document.getElementById(item)
    let currentVotes = document.getElementById(item).innerText;
    let newVotes = Number(currentVotes) + Number(direction);
    tally.innerText = newVotes;
    saveFile();
}

let saveFile = () => {
    // Gather current data from HTML elements
    const winVotes = document.getElementById('votes-prev').innerText;
    const newVotes = document.getElementById('votes-new').innerText;
    const challenger1 = document.getElementById('votes-1').innerText;
    const challenger2 = document.getElementById('votes-2').innerText;

    // Convert data for text file save
    let data = 
        '\rwinVotes: ' + winVotes + '\r\n' +
        'newVotes: ' + newVotes + '\r\n' +
        'challenger1: ' + challenger1 + '\r\n' +
        'challenger2: ' + challenger2;

    // Convert text to Blob a file API
    const textToBlob = new Blob([data], { type: 'text/plain'});
    const sFileName = 'dataHold.txt';

    
}

function readTextFile(file) {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                const allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}