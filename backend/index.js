//-------------------------------------------------------------------------------
// Imports and Dependencies
//-------------------------------------------------------------------------------

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');



//-------------------------------------------------------------------------------
// Start and Configure Express
//-------------------------------------------------------------------------------

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//-------------------------------------------------------------------------------
// Start and Configure Express
//-------------------------------------------------------------------------------

var MongoClient = require('mongodb').MongoClient;
var config = require("../db-config.js");
const uri = "mongodb+srv://" + config.username + ":" + config.password 
            + "@" + config.host + "/" + config.dbname + "?" + config.params;
            var db;



//-------------------------------------------------------------------------------
// Initialize Connection Once and Reuse Database Object in Request Handlers
//-------------------------------------------------------------------------------

MongoClient.connect(uri, function(err, client) {
  if(err) throw err;
  db = client.db("testdb1");
  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});



//-------------------------------------------------------------------------------
// GET: /RecipeBook/getrecipes/:user
//-------------------------------------------------------------------------------

app.get("/RecipeBook/getrecipes/:user", async function(req, res) {

    let cursor = db.collection('testcollection1').find();
    var results = [];
    for await (let doc of cursor) {
        results.push(doc);
    }
    console.log(results.length);
    if (results.length > 0) {
        console.log('success');
        res.json(results[0].recipes);
    }
    else (res.json(null));
  });


  
//-------------------------------------------------------------------------------
// PUT: /RecipeBook/newrecipe
//-------------------------------------------------------------------------------

app.put("/RecipeBook/newrecipe", function(req, res) {
    db.collection.insertOne({"user": "user", "recipes": req.body}); 
});


