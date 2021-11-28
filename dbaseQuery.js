/*
	Title: battleImages dbaseQuery
	Author: Chris Peterman
	Description: This contains all the functionality for the Battle Images homepage when talking to the
	database. 

	uses: Node.js, express.js, MariaDB
*/


const mysql = require('./dbcon.js');
const express = require('express');
const CORS = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('port', 2173);
app.use('/public_html', express.static('./public_html/'));
app.use(CORS());

const finishBattle = "UPDATE battleImages SET championVotes=?, championImg=?, championNewVotes=?, challengerOneImg=?, challengerOneVotes=?, challengerTwoImg=?, challengerTwoVotes=?, votesPool=?  WHERE id=? ";
const genericQuery = "SELECT * FROM battleImages";
const voteQuery = "UPDATE battleImages SET championNewVotes=?, challengerOneVotes=?, challengerTwoVotes=?, votesPool=?  WHERE id=?";

const getAllData = (res) => {
    mysql.pool.query(genericQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
      res.json({"rows" : rows});
    })
  }

app.get('/', function(req, res, next) {
    getAllData(res)
})

app.post('/vote', function(req, res, next) {
  const {championNewVotes, challengerOneVotes, challengerTwoVotes, votesPool} = req.body;

  mysql.pool.query(voteQuery, [championNewVotes, challengerOneVotes, challengerTwoVotes, votesPool, 1], (err, results) => {
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  })
});

app.post('/finishBattle', function(req, res, next) {
  const {championVotes, championNewVotes, championImg, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes, votesPool} = req.body;

  mysql.pool.query(finishBattle, [championVotes, championImg, championNewVotes, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes, votesPool, 1], (err, results) =>{
    if(err){
      next(err);
      return;
    }
    getAllData(res);
  })
})

app.use(function(req,res){
    res.status(404);
    console.log('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    console.log(err.status);
  });

app.listen(app.get('port'), function() {
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + "; Press Ctrl-C to quit.")
})
