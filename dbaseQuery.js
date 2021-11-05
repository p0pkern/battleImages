const mysql = require('./dbcon.js');
const express = require('express');
const CORS = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('port', 2173);
app.use('/public_html', express.static('./public_html/'));
app.use(CORS());

// Query parameters
const finishBattle = "UPDATE battleImages SET championVotes=?, championImg=?, championNewVotes=?, challengerOneImg=?, challengerOneVotes=?, challengerTwoImg=?, challengerTwoVotes=? WHERE id=? ";
const genericQuery = "SELECT * FROM battleImages";
const voteQuery = "UPDATE battleImages SET championNewVotes=?, challengerOneVotes=?, challengerTwoVotes=? WHERE id=?";

// These are just for troubleshooting/setup purposes
const dropTableQuery = "DROP TABLE IF EXISTS battleImages";
const makeTableQuery = `CREATE TABLE battleImages (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        championImg VARCHAR(2083) NOT NULL,
                        championVotes INT,
                        championNewVotes INT,
                        challengerOneImg VARCHAR(2083) NOT NULL,
                        challengerOneVotes INT,
                        challengerTwoImg VARCHAR(2083) NOT NULL,
                        challengerTwoVotes INT);`;
const insertQuery = "INSERT INTO battleImages (`championImg`, `championVotes`, `championNewVotes`, `challengerOneImg`, `challengerOneVotes`, `challengerTwoImg`, `challengerTwoVotes`) VALUES (?, ?, ?, ?, ?, ?, ?)";


const getAllData = (res) => {
  /* 
    Selects all data from the current database field. All data is currently stored
    in a single row of the database.
  */
    mysql.pool.query(genericQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
      res.json({"rows" : rows});
    })
  }


app.get('/', function(req, res, next) {
    /* Get request for all data in the current field */
    getAllData(res)
})

app.post('/vote', function(req, res, next) {
  /* Updates votes in the MySQL database, and retrieves the current votes to display */
  const {championNewVotes, challengerOneVotes, challengerTwoVotes} = req.body;

  mysql.pool.query(voteQuery, [championNewVotes, challengerOneVotes, challengerTwoVotes, 1], (err, results) => {
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  })
});

app.post('/finishBattle', function(req, res, next) {
  /* 
    Finishes the battle and updates the champion if necessary, otherwise will set all votes
    to 0 (handled client side) and updates the database with the new images pulled from a separate server.
    Afterward data will be requested so the page can be updated.
  */
  const {championVotes, championNewVotes, championImg, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes} = req.body;

  mysql.pool.query(finishBattle, [championVotes, championImg, championNewVotes, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes, 1], (err, results) =>{
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  })
})

// 404 Error response
app.use(function(req,res){
    res.status(404);
    console.log('404');
  });

// 500+ errors
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    console.log(err.status);
  });

app.listen(app.get('port'), function() {
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + "; Press Ctrl-C to quit.")
})