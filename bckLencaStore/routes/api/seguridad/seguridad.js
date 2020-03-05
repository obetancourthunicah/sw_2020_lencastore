var express =  require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initSeguridad (db) {
var userModel = require('./seguridad.model')(db);
// HTTP GET POST PUT DELETE
/*
  GET   obtener  -> SELECT -> Consulta
    filtros - parametros  // dentro de la uri
  POST  crear  -> INSERT -> Agregar
      datos  // dentro del body del request
  PUT   actualizar -> UPDATE -> modificar o actualizar un recurso
     filtros - parametros  // dentro de la uri
      datos // dentro del body del request
  DELETE eliminar -> DELETE -> eliminar un Recurso
    filtros - parametros  // dentro de la uri
*/

// Crear un modelo de datos para la entidad

// CRUD
// http://localhost:3000/api/seguridad/users/all
// Obtener todos los registros de usuarios
router.get('/users/all', (req, res)=>{
    userModel.getAll((err, users)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(users);
    });
} ); // get users/all


// http://localhost:3000/api/seguridad/users/1
router.get('/users/:id',(req, res)=>{
    var id =  req.params.id ;
    userModel.getById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});

// http://localhost:3000/api/seguridad/users/new
router.post('/users/new', (req, res)=>{
  var datosEnviados = req.body;
  // var newUser = userModel.addNew(datosEnviados);
  // return res.status(200).json(newUser);
  userModel.addNew(datosEnviados, (err, addedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'error'});
    }
    return res.status(200).json(addedDoc);
    }); //addNew
}); // post users/new

router.put('/users/upd/:id', (req, res)=>{
  var id = req.params.id;
  var data = {
    "_id": id,
    ...req.body
  };

  //var updUser = userModel.update( id, req.body);
  userModel.update(data, (err, updatedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(updatedDoc);
  });// update
});


router.delete('/users/del/:id', (req, res)=>{
  var id = req.params.id;
  userModel.deleteByCode(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  }); //  deleteByCode
});//delete


router.post('/login', (req, res)=>{
  var {userEmail, userPswd} = req.body;
  userModel.getByEmail(userEmail, (err,user)=>{
    if(err){
      console.log(err);
      return res.status(400).json({"msg":"Credencales no pueden ser validadas"});
    }
    if (userModel.comparePswd(user.userPswd, userPswd)){
      delete user.userPswd;
      var token =  jwt.sign(user,
      'cuandoLosGatosNoEstanFiestanlosRatonesHacen',
      {expiresIn:'60m'}
      )
      return res.status(200).json({"user":user, "jwt":token});
    }
    console.log({ userEmail, userPswd, ...{ "msg":"No Coincide Pswds"}});
    return res.status(400).json({ "msg": "Credencales no pueden ser validadas" });
  });//getByEmail
});// post login

 return router;
}

//module.exports = router;
module.exports = initSeguridad;
