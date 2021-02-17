
var config = require("../db-config.js");

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://" + config.username + ":" + config.password 
            + "@" + config.host + "/" + config.dbname + "?" + config.params;


const client = new MongoClient(uri, { useNewUrlParser: true });
        

/*
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/EmployeeDB';
var str = "";

app.route('/Employeeid').get(function(req, res) {
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('Employee');
       var cursor = collection.find({});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    Employee id  " + item.Employeeid + "</br>";
           }
       }, function(err) {
           res.send(err);
           db.close();
          }
       );
   });
});
*/

var url = "http://localhost:3000/RecipeBook/getrecipes/user";

function getrecipes(req, res) {
  MongoClient.connect(url, (err, db) => {
    
    console.log(db == null);

    var collection = db.collection('testcollection1');

    var cursor = collection.find({});
    str = "";
    cursor.forEach(
      function(item) {
        if (item != null) {
          console.log("ITEM: " + item)
        }
      }, 
      function(err) {
        res.send(err);
        db.close();
      }
    );
  }
)}

/*function newrecipe(req, res) {
  client.connect(err => {
    const collection = client.db("testdb1").collection("testcollection1");
    collection.insertOne({"user": "user", "recipes": req.body})
    client.close();
  })
}


function getrecipes(req, res) {
  client.connect(err => {
    const collection = client.db("testdb1").collection("testcollection1");
    collection.find({"user":"user"}).toArray((err, docs) => {
      const saveDocs = docs;
      console.log(saveDocs[0].recipes);
      res.json(saveDocs[0].recipes);
      client.close();
    })
    client.close();
  })
}*/



module.exports = {
  //newrecipe: newrecipe,
  getrecipes: getrecipes,
}

