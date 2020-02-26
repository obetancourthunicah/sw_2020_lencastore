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

  return seguridadModel;
}
