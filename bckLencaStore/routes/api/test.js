var express= require('express');
var router = express.Router();

function initTest(db){
  var contactsCollection = db.collection('contacts');

  router.get('/all', (req, res )=>{
    contactsCollection.find({}).toArray(
      (err, docs)=>{
        if(err){
          console.log(err);
          return res.status(404).json({"msg":"Not Found"});
        }
        return res.status(200).json(docs);
      }
    );
  } );//get all
  return router;
}

module.exports = initTest;
