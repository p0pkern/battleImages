const updateAll = () => {
    /*
        Pulls the images and votes currently in the database and populates them into
        their fields.
    */

    const req = new XMLHttpRequest();
    req.open("GET", "http://flip1.engr.oregonstate.edu:2173/", false);
    req.onload = function() {
        if (req.readyState == 4 && req.status >= 200 && req.status < 400) {
            const payLoad = JSON.parse(req.responseText);
            document.getElementById("votes-prev").innerText = payLoad['rows'][0]['championVotes'];
            document.getElementById("votes-new").innerText = payLoad['rows'][0]['championNewVotes'];
            document.getElementById("votes-1").innerText = payLoad['rows'][0]['challengerOneVotes'];
            document.getElementById("votes-2").innerText = payLoad['rows'][0]['challengerTwoVotes'];
            document.getElementById("img-one").setAttribute('src', payLoad['rows'][0]['championImg']);
            document.getElementById("img-two").setAttribute('src', payLoad['rows'][0]['challengerOneImg']);
            document.getElementById("img-three").setAttribute('src', payLoad['rows'][0]['challengerTwoImg']);

            
        } else {
            console.error(payLoad);
        }
    }
    req.send(null);
}

document.addEventListener('DOMContentLoaded', updateAll());