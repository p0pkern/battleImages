/*
    Title - Battle Images
    Author - Chris Peterman
    Description: Vote on the best image on the internet one vote at a time. The image with the highest votes
                 will be stored at the top with the winning amount of votes and all other images will be replaced.

                Front End: JavaScript
                Backend: MariaDB, Node.js
*/

const checkVotes = () => {
  /*
    Checks the vote pool to see if there are still votes to use
  */

   let votesPool = document.getElementById('votes-pool').innerText;

   if (Number(votesPool) <= 1) {
	totalVotes();
   }

}

const vote = (voteOn, amount) => {
    /*
        Increase and decrease the votes by an increment of 1 or -1
        Text on screen is updated before database is updated
    */

    // Increase/decrease the votes on the page first
    const newVote = Number(document.getElementById(voteOn).innerText) + Number(amount);
    document.getElementById(voteOn).innerText = newVote

    // Pull the inner text from all the votes and send them over the mysql database
    const championNewVotes = document.getElementById('votes-new').innerText;
    const challengerOneVotes = document.getElementById('votes-1').innerText;
    const challengerTwoVotes = document.getElementById('votes-2').innerText;
    
    // Pull from vote pool and adjust
    const votesPool = document.getElementById('votes-pool').innerText;
    let adjustedVotes = Number(votesPool) - Number(amount);
    votesPool.innerText = adjustedVotes;    

    const body = {
        "championNewVotes" : championNewVotes,
        "challengerOneVotes" : challengerOneVotes,
        "challengerTwoVotes" : challengerTwoVotes,
	"votesPool"	     : adjustedVotes
    }
    
    // Update the vote contents of the mysql database and reload the page
    const req = new XMLHttpRequest();
    req.open('POST', "http://flip1.engr.oregonstate.edu:2173/vote", true)
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
    req.onload = function() {
        if (req.readyState == 4 && req.status <= 200 && req.status < 400) {
            updateAll();
            
        } else {
            console.log(req.responseText);
        }
    }

    checkVotes();
}

const totalVotes = () => {
    /*
        Totals the votes of all the images and shuffles or replaces the images as needed
    */
    const championNewVotes = Number(document.getElementById('votes-new').innerText);
    const challengerOneVotes = Number(document.getElementById('votes-1').innerText);
    const challengerTwoVotes = Number(document.getElementById('votes-2').innerText);

    if (challengerOneVotes > championNewVotes && challengerOneVotes > challengerTwoVotes) {
        changeWinner('votes-1', 'img-two');
    } else if (challengerTwoVotes > championNewVotes && challengerTwoVotes > challengerOneVotes) {
        changeWinner('votes-2', 'img-three');
    } else {
        changeWinner('votes-new', 'img-one');
    }
}

const changeWinner = (winner, winImg) => {
    /*
        Set up the body object with the current winners votes and img in the proper tags
    */
   const championVotes = document.getElementById(winner).innerText;
   const championImg = document.getElementById(winImg).getAttribute('src');

   const body = {
    "championVotes" : championVotes,
    "championImg" : championImg
   }

   changeChallengers(body);

}

const changeChallengers = (body) => {
   /*
     Populates the rest of the body object with the updated data, resetting all votes to 0
     and requesting new images from the image server.
   */

   const challengerOneImg =  getNewImage();
   const challengerTwoImg =  getNewImage();

   body["championNewVotes"] = 0;
   body["challengerOneImg"] = challengerOneImg;
   body["challengerOneVotes"] = 0;
   body["challengerTwoImg"] = challengerTwoImg,
   body["challengerTwoVotes"] = 0;
   body["votesPool"] = Math.floor(Math.random() * 20) + 1;

   const req = new XMLHttpRequest();
   req.open("POST", "http://flip1.engr.oregonstate.edu:2173/finishBattle", false);
   req.setRequestHeader('Content-Type', 'application/json');
   req.send(JSON.stringify(body));
   req.onload = function() {
    if (req.readyState == 4 && req.status <= 200 && req.status < 400) {
        } else {
            console.log(req.responseText);
        }
    }
    updateAll();
}

const getNewImage = () => {
    /*
        Sends a request to a team members image server for one random image
        In the servers current iteration it will bring one of 14 images,
        duplicates are allowed.
    */
    let response;

    const req = new XMLHttpRequest();
    req.open("GET", "http://flip3.engr.oregonstate.edu:17778/getImage?response_type=random", false);
    req.onload = function() {
        if (req.readyState == 4 && req.status >= 200 && req.status < 400) {
            response = JSON.parse(req.responseText);
            
        } else {
            console.log(req.statusText);
        }
    }
    req.send(null);
    return response;
}


const updateAll = () => {
    /*
        Updates the content on the page with all currently stored data in the database.
    */

    let votesPrev = document.getElementById("votes-prev");
    let votesNew = document.getElementById("votes-new");
    let votesOne = document.getElementById("votes-1");
    let votesTwo = document.getElementById("votes-2");
    let imgOne = document.getElementById("img-one");
    let imgTwo = document.getElementById("img-two");
    let imgThree = document.getElementById("img-three");
    let votesPool = document.getElementById("votes-pool");

    const req = new XMLHttpRequest();
    req.open("GET", "http://flip1.engr.oregonstate.edu:2173/", false);
    req.onload = function() {
        if (req.readyState == 4 && req.status >= 200 && req.status < 400) {
            const payLoad = JSON.parse(req.responseText);

            votesPrev.innerText = payLoad['rows'][0]['championVotes'];
            votesNew.innerText = payLoad['rows'][0]['championNewVotes'];
            votesOne.innerText = payLoad['rows'][0]['challengerOneVotes'];
            votesTwo.innerText = payLoad['rows'][0]['challengerTwoVotes'];
            imgOne.setAttribute('src', payLoad['rows'][0]['championImg']);
            imgTwo.setAttribute('src', payLoad['rows'][0]['challengerOneImg']);
            imgThree.setAttribute('src', payLoad['rows'][0]['challengerTwoImg']);
            votesPool.innerText = payLoad['rows'][0]['votesPool'];
            
            console.log(payLoad['rows'][0]); 
        } else {
            console.error(payLoad);
        }
    }
    req.send(null);
}


document.addEventListener('DOMContentLoaded', updateAll());
