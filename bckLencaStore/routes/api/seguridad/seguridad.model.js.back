var fs = require('fs');
var fileToSave = 'security.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var userTemplate = {
  userEmail:"",
  userPswd:"",
  userCompleteName:"",
  userID:'',
  userDateCreated: null
}

openFile();

userModel.getAll = ()=>{
  return userCollection;
}

userModel.getById = (id)=>{
  var filteredUsers = userCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}

userModel.addNew = ({ useremail, userpswd, usernames }  )=>{
  var newUser = Object.assign(
    {},
    userTemplate,
    {
      userEmail: useremail,
      userPswd: userpswd,
      userCompleteName: usernames,
      userDateCreated: new Date().getTime()
    }
  );
  newUser.userID = userCollection.length + 1;

  userCollection.push(newUser);
  writeToFile();
  return newUser;
}

userModel.update = (id, { userpswd, usernames })=>{
 var updatingUser = userCollection.filter(
   (o, i)=>{
     return o.userID === id;
   }
 );
 if(updatingUser && updatingUser.length>0){
   updatingUser = updatingUser[0];
 } else {
   return null;
 }
 var updateUser = {};
 var newUpdatedCollection = userCollection.map(
   (o, i)=>{
     if(o.userID === id){
       updateUser = Object.assign({},
          o,
         { userPswd: userpswd, userCompleteName:usernames}
       );
       return updateUser;
     }else{
       return o;
     }
   }
 );
  userCollection = newUpdatedCollection;
  writeToFile();
  return updateUser;
}

userModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = userCollection.filter(
    (o)=>{
      return o.userID !== id;
    }
  );
  userCollection = newCollection;
  writeToFile();
  return true;
}


// userCollection.push(
//   Object.assign(
//     {},
//     userTemplate,
//     {
//       userEmail:"obetancourthunicah@unicah.edu",
//       userPswd: "noti1234",
//       userCompleteName: "Orlando J Betancourth",
//       userID: 1,
//       userDateCreated: new Date().getTime()
//     }
//   )
// );

// userCollection.push(
//   Object.assign(
//     {},
//     userTemplate,
//     {
//       userEmail: "fulanodetal@uncorre.com",
//       userPswd: "noti5678",
//       userCompleteName: "Fulanito de Tal Menganito",
//       userID: 2,
//       userDateCreated: new Date().getTime()
//     }
//   )
// );
//  // new Date(timestamp)


module.exports = userModel;
