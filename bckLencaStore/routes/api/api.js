
/// rutas -> router ->  app : express

/// rutas -> router:entidad -> router:api -> app:express


var express = require('express');
var router = express.Router();
function initApi(db){

    /// Routers de Entidades
    var seguridadRouter = require('./seguridad/seguridad')(db);


    router.use('/seguridad', seguridadRouter);

    // http://localhost:3000/api/version
    router.get('/version', function(req, res){
      res.status(200).json({"version":"API v1.0"});
    } );
 return router;
}
//module.exports = router;
module.exports = initApi;

/*
// Estructura de un Módulo y uso de module.exports para
// exponer la funcionalidad del módulo.


var libLencaFunctions = {}; //JSON Javascript Object Notation

libLencaFunctions.mensaje = "Hola Mundo";
libLencaFunctions.version = "v1.0";
libLencaFunctions.sayHello = ()=>{
  console.log("Hello!");
} // ES6

//
//libLencaFunctions.sayHello = function(){
//  console.log("Hello");
//}
//

module.exports = libLencaFunctions;
*/
