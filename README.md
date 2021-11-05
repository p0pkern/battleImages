![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# battleImages
Hello,

My name is Chris Peterman and I am a Computer Science college student at Oregon State University. I'm in my final year of school and will graduate Spring 2022.

With user votes and removal votes, choose the best image on the internet. Winning images will be hosted on the top banner.

## Installation

This is a project built for my Software Engineering 1 class at Oregon State University. All of the backend functionality is built on top of the OSU servers and unless you are connected to the OSU VPN it will not function.

Download the app.js, package.json, index.html, dbaseQuery.js, and style.css and run

```bash
    npm install
```

Set up the MySQL database and import update the import credentials in dbaseQuery.js if need be.

```javascript
    const mysql = require('PATH TO DBASE CONFIGURATION');
```

Run node on dbaseQuery.js in order to establish the server and MySQL calls. You may need to update the server port if it is already taken.

```
    node dbaseQuery.js
```

## Usage

Votes are tallied one at a time and sent to the database to be updated. When all the votes are cast, click the button at the top called 'Finalize Votes!' to tally the votes.

If the champion wins. The champions current votes will update as the previous winning votes and two new images will be requested from an image processing server to replace the two challengers.

If a challenger wins. The champion is replaced by the winning challenger and two new images will be requeted from an image processing server to replace the old champion and the other challenger.

## Contributions
Pull requests are welcome.
