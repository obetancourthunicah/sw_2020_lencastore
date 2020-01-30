var userModel = {};

var userCollection = [];

var userTemplate = {
  userEmail:"",
  userPswd:"",
  userCompleteName:"",
  userID:'',
  userDateCreated: null
}

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

userCollection.push(
  Object.assign(
    {},
    userTemplate,
    {
      userEmail:"obetancourthunicah@unicah.edu",
      userPswd: "noti1234",
      userCompleteName: "Orlando J Betancourth",
      userID: 1,
      userDateCreated: new Date().getTime()
    }
  )
);

userCollection.push(
  Object.assign(
    {},
    userTemplate,
    {
      userEmail: "fulanodetal@uncorre.com",
      userPswd: "noti5678",
      userCompleteName: "Fulanito de Tal Menganito",
      userID: 2,
      userDateCreated: new Date().getTime()
    }
  )
);
 // new Date(timestamp)


module.exports = userModel;
