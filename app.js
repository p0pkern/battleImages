
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
    let data = {
        "winVotes": winVotes,
        "newVotes": newVotes,
        "challenger1": challenger1,
        "challenger2": challenger2
    }

    localStorage.setItem('localSave', data);
    
}

function getData() {
    
    if(lovalStorage.getItem('localSave')) {
        const localSave = localStorage.getItem('localSave');

        document.getElementById('votes-prev').innerText = localSave['winVotes'];
        document.getElementById('votes-new').innerText = localSave['newVotes'];
        document.getElementById('votes-1').innerText = localSave['challenger1'];
        document.getElementById('votes-2').innerText = localSave['challenger2'];
    } else {
        activateNewSession();
    }

    //TODO input image response.
}

function activateNewSession() {
    
}
