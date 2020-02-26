var express =  require('express');
var router = express.Router();

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
/*

// http://localhost:3000/api/seguridad/users/1
router.get('/users/:id',(req, res)=>{
    var id = parseInt( req.params.id );
    var user = userModel.getById(id);
    return res.status(200).json(user);
});
*/
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
/*
router.put('/users/upd/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  var updUser = userModel.update( id, req.body);
  return res.status(200).json(updUser);
});

router.delete('/users/del/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  userModel.deleteByCode(id);
  res.status(200).json({"deleted":true});
});//delete
*/
 return router;
}

//module.exports = router;
module.exports = initSeguridad;
