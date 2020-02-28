var ObjectID = require('mongodb').ObjectID;

module.exports = (db)=>{
  var seguridadModel = {}
  var seguridadCollection = db.collection("users");
  var userTemplate = {
    userEmail: "",
    userPswd: "",
    userCompleteName: "",
    userDateCreated: null
  }
  seguridadModel.getAll = (handler)=>{
    // handler(err, docs)
    seguridadCollection.find({}).toArray(handler);
  }

  seguridadModel.addNew = (dataToAdd, handler)=>{
      //handler(err, addedDocument)
      /*
      useremail:obetancourthunicah@gmail.com
      userpswd:12345678
      usernames:Orlando Betancourth
      lerolero:Lero Candelero
       */
    var { useremail, userpswd, usernames} = dataToAdd;
    var userToAdd = Object.assign(
      {},
      userTemplate,
      {
        userEmail: useremail,
        userPswd: userpswd,
        userCompleteName: usernames,
        userDateCreated: new Date().getTime()
      }
    );
    seguridadCollection.insertOne(userToAdd, (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); //insertOner
  }

  seguridadModel.update = ( dataToUpdate , handler )=>{
    var { _id, userpswd, usernames} = dataToUpdate;
    var query = { "_id": new ObjectID(_id)};
    var updateCommad = {
      "$set":{
        userPswd: userpswd,
        userCompleteName: usernames,
        lastUpdated: new Date().getTime()
      },
      "$inc" :{
        "updates": 1
      }
    };
    seguridadCollection.updateOne(
      query,
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );// updateOne
  }

  seguridadModel.deleteByCode = (id, handler)=>{
    var query = {"_id": new ObjectID(id)};
    seguridadCollection.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
  }

  seguridadModel.getById = (id, handler) => {
    var query = { "_id": new ObjectID(id) };
    seguridadCollection.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); //findOne
  }

  return seguridadModel;
}
