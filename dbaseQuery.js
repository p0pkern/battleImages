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

const dropTableQuery = "DROP TABLE IF EXISTS battleImages";
const makeTableQuery = `CREATE TABLE battleImages (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        championImg VARCHAR(2083) NOT NULL,
                        championVotes INT,
                        championNewVotes INT,
                        challengerOneImg VARCHAR(2083) NOT NULL,
                        challengerOneVotes INT,
                        challengerTwoImg VARCHAR(2083) NOT NULL,
                        challengerTwoVotes INT,
			votesPool INT);`;
const insertQuery = "INSERT INTO battleImages (`championImg`, `championVotes`, `championNewVotes`, `challengerOneImg`, `challengerOneVotes`, `challengerTwoImg`, `challengerTwoVotes`, `votesPool` ) VALUES (?, ?, ?, ?, ?, ?,?, ?)";


// Get request for all data
const getAllData = (res) => {
    mysql.pool.query(genericQuery, (err, rows, fields) => {
      if(err){
        next(err);
        return;
      }
      res.json({"rows" : rows});
    })
  }

// Retrieve all current data in the database
app.get('/', function(req, res, next) {
    getAllData(res)
})

// Update the votes for all of the images in the database
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

// TROUBLE SHOOTING TO BE DELETED
// Reset the table to empty values for troubleshooting
app.get('/reset-table',function(req,res,next){
    mysql.pool.query(dropTableQuery, function(err){
      mysql.pool.query(makeTableQuery, function(err){
        const championImg = "https://image.shutterstock.com/image-vector/random-blotch-inkblot-organic-blob-600w-1612925449.jpg";
        const championVotes = 0;
        const championNewVotes = 0;
        const challengerOneImg = "https://image.shutterstock.com/image-vector/mystery-box-random-loot-flat-600w-1469820695.jpg";
        const challengerOneVotes = 0;
        const challengerTwoImg = "https://www.kenyons.com/wp-content/uploads/2017/04/default-image.jpg";
        const challengerTwoVotes = 0;
        const votesPool = 10;
 
        mysql.pool.query(insertQuery, 
            [championImg, championVotes, championNewVotes, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes, votesPool], 
            (err, result) => {
            if(err){
                next(err);
                return;
            }
            getAllData(res);
        })
        
      })
    });
  });

app.get('/update', function(req, res, next) {
    /* Check the update functionality to ensure database updates */
    const idRow = 1;
    const championImg = "";
    const championVotes = 4;
    const championNewVotes = 0;
    const challengerOneImg = "";
    const challengerOneVotes = 0;
    const challengerTwoImg = "";
    const challengerTwoVotes = 0;
    const votesPool = 15; 

    mysql.pool.query(finishBattle, [championImg, championVotes, championNewVotes, challengerOneImg, challengerOneVotes, challengerTwoImg, challengerTwoVotes,votesPool, idRow], 
        (err, result) => {
            if(err){
                next(err);
                return;
            }
            getAllData(res);
    })
})

// Error responses
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
