var config = require('../db-config.js');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://" + config.username + ":" 
            + config.password + "@" + config.host 
            + "/" + config.database + "?" + config.params;

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const db = client.db('testdb1');
  const collection = db.collection('testcollection1');
  collection.insertOne({"yes":"i win"});
  client.close();
});

