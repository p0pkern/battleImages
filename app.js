
function testImages() {
    let images = [
        "https://image.shutterstock.com/image-vector/random-blotch-inkblot-organic-blob-600w-1612925449.jpg",
        "https://image.shutterstock.com/image-vector/mystery-box-random-loot-flat-600w-1469820695.jpg",
        "https://image.shutterstock.com/image-illustration/geometry-random-dimensional-wave-series-600w-1831016305.jpg",
        "https://image.shutterstock.com/image-photo/random-act-kindness-600w-731074915.jpg",
        "https://image.shutterstock.com/image-vector/crowd-behaviors-measuring-social-sampling-600w-689023369.jpg",
        "https://image.shutterstock.com/image-photo/background-randomly-scattered-multicolored-sewthrough-600w-1358598311.jpg",
        "https://image.shutterstock.com/image-vector/set-abstract-initial-azmonogram-logo-600w-1935882601.jpg",
        "https://image.shutterstock.com/image-vector/blah-talk-comic-bubble-text-600w-353692793.jpg",
        "https://image.shutterstock.com/image-photo/white-haski-dog-sits-looks-600w-2009449646.jpg",
        "https://image.shutterstock.com/image-photo/british-cat-golden-retriever-600w-646123102.jpg",
        "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg"
    ];

    return images[Math.floor(Math.random()*images.length)];
}

const vote = (item, direction) => {
    let tally = document.getElementById(item)
    let currentVotes = document.getElementById(item).innerText;
    let newVotes = Number(currentVotes) + Number(direction);
    tally.innerText = newVotes;
    saveFile();
}

function saveFile() {

    // Gather current data from HTML elements and save in local storage

    const winVotes = document.getElementById('votes-prev').innerText;
    const newVotes = document.getElementById('votes-new').innerText;
    const challenger1 = document.getElementById('votes-1').innerText;
    const challenger2 = document.getElementById('votes-2').innerText;
    const imgOne = document.getElementById('img-one').getAttribute('src');
    const imgTwo = document.getElementById('img-two').getAttribute('src');
    const imgThree = document.getElementById('img-three').getAttribute('src');
    

    let data = {
        "winVotes": winVotes,
        "newVotes": newVotes,
        "challenger1": challenger1,
        "challenger2": challenger2,
        "img-one": imgOne,
        "img-two": imgTwo,
        "img-three": imgThree
    }

    localStorage.setItem('localSave', JSON.stringify(data));
    
}

async function getData() {

    // Try to access localStorage, if you can update with the contents
    // If it does not exist create a new local storage with default values
    if(localStorage.getItem('localSave')) {

        const localSave = JSON.parse(localStorage.getItem('localSave'));

        document.getElementById('votes-prev').innerText = localSave['winVotes'];
        document.getElementById('votes-new').innerText = localSave['newVotes'];
        document.getElementById('votes-1').innerText = localSave['challenger1'];
        document.getElementById('votes-2').innerText = localSave['challenger2'];
        document.getElementById('img-one').setAttribute('src', localSave['img-one']);
        document.getElementById('img-two').setAttribute('src', localSave['img-two']);
        document.getElementById('img-three').setAttribute('src', localSave['img-three']);

    } else {
       await activateNewSession();
    }

}

const activateNewSession = async () => {
    // Sets default values for local storage

    let imgs = await testImages();

    let data = {
        "winVotes": 0,
        "newVotes": 0,
        "challenger1": 0,
        "challenger2": 0,
        "img-one": imgs[0],
        "img-two": imgs[1],
        "img-three": imgs[2],
    }

    setTimeout(localStorage.setItem('localSave', JSON.stringify(data)), 5000);

    getData();
}

function getImages() {
    // TODO Implement this when Microservice is ready
};

async function testImages() {
    let images = [
        "https://image.shutterstock.com/image-vector/random-blotch-inkblot-organic-blob-600w-1612925449.jpg",
        "https://image.shutterstock.com/image-vector/mystery-box-random-loot-flat-600w-1469820695.jpg",
        "https://image.shutterstock.com/image-illustration/geometry-random-dimensional-wave-series-600w-1831016305.jpg",
        "https://image.shutterstock.com/image-photo/random-act-kindness-600w-731074915.jpg",
        "https://image.shutterstock.com/image-vector/crowd-behaviors-measuring-social-sampling-600w-689023369.jpg",
        "https://image.shutterstock.com/image-photo/background-randomly-scattered-multicolored-sewthrough-600w-1358598311.jpg",
        "https://image.shutterstock.com/image-vector/set-abstract-initial-azmonogram-logo-600w-1935882601.jpg",
        "https://image.shutterstock.com/image-vector/blah-talk-comic-bubble-text-600w-353692793.jpg",
        "https://image.shutterstock.com/image-photo/white-haski-dog-sits-looks-600w-2009449646.jpg",
        "https://image.shutterstock.com/image-photo/british-cat-golden-retriever-600w-646123102.jpg",
        "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg"
    ];

    const one = images[Math.floor(Math.random()*images.length)];
    const two = images[Math.floor(Math.random()*images.length)];
    const three = images[Math.floor(Math.random()*images.length)];

    return [one,two,three]
}

function finishVoting() {
    let imgOneVotes = Number(document.getElementById('votes-new').innerText);
    let imgTwoVotes = Number(document.getElementById('votes-1').innerText);
    let imgThreeVotes = Number(document.getElementById('votes-2').innerText);

    if (imgTwoVotes > imgOneVotes && imgTwoVotes > imgThreeVotes){
        // Code for Challenger 1 wins
        const imgTwo = document.getElementById('img-two').getAttribute('src');
        replaceWinner(imgTwoVotes, imgTwo);

    } else if (imgThreeVotes > imgOneVotes && imgThreeVotes > imgTwoVotes) {
        // Code for if Challenger 2 wins

    } else {
        // If neither of the two images wins, we keep the winner and delete the challengers
        replaceChallengers();
    }

}

function replaceWinner(newVotes, newSrc) {
    const localSave = JSON.parse(localStorage.getItems('localSave'));
    
}

async function replaceChallengers() {
    const newImgs = await testImages();
    const localSave = JSON.parse(localStorage.getItem('localSave'));

    const bestVotes = Math.max(Number(localSave['winVotes']), Number(localSave['newVotes']));

    console.log(bestVotes)

    const newData = {
        "winVotes": bestVotes,
        "newVotes": 0,
        "challenger1": 0,
        "challenger2": 0,
        "img-one": localSave['img-one'],
        "img-two": newImgs[0],
        "img-three": newImgs[1],
    }

    setTimeout(localStorage.setItem('localSave', JSON.stringify(newData)), 5000);

    getData();
}

window.addEventListener('DOMContentLoaded', (event) => {
    getData();
})
