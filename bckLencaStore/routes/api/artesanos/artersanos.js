var express = require("express");
var router = express.Router();

function artesanosInit(db) {
  var prdModel = require("../productsModel/products.model")(db);

  router.get('/products/find/:id', (req, res) => {
    var { id: _id } = req.params;
    var id = _id || '';
    prdModel.getProductById(id, (err, doc) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.status(200).json(doc);
    })
  })

  router.get('/products/:page/:items', (req, res)=>{
      var {page, items} = req.params;
      prdModel.getProductByOwner(
        req.user._id,
        {},
        parseInt(page),
        parseInt(items),
        "sku",
        (err, rslt)=>{
          if(err){
            return res.status(500).json({});
          }
          return res.status(200).json(rslt);
        });
  }); // get products page items

  router.post('/products/add', (req, res)=>{
    var {name, sku, barcod, price, stock} = req.body;
    var insertCurated= {};
    if(name && !(/^\s*$/).test(name)){
      insertCurated.name = name;
    }
    if (sku && !(/^\s*$/).test(name)) {
      insertCurated.sku = sku;
    }
    if (barcod && !(/^\s*$/).test(barcod)) {
      insertCurated.sku = sku;
    }
    if (price && !isNaN(price)) {
      insertCurated.price = parseFloat(price);
    }
    if (stock && !isNaN(stock)) {
      insertCurated.stock = parseFloat(stock);
    }
    prdModel.addNewProduct(
       req.user._id,
       req.user.userCompleteName,
       insertCurated,
       (err, rslt)=>{
         if(err){
           return res.status(500).json({});
         }
         return res.status(200).json(rslt);
      }
    );
  });



  router.put('/products/stock/:id' , (req, res)=>{
      var { stock : _stockDelta } = req.body;
      var stockDelta = 0;
      if (_stockDelta && !isNaN(_stockDelta)){
        stockDelta = parseInt(_stockDelta);
      }
      prdModel.addStockToProduct( req.params.id, stockDelta, (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      })
  });

  router.put('/products/upd/:id', (req, res)=>{
    var { name, price, stock, status } = req.body;
    var updateCurated = {};
    if (name && !(/^\s*$/).test(name)) {
      updateCurated.name = name;
    }
    if (sku && !(/^\s*$/).test(name)) {
      updateCurated.sku = sku;
    }
    if (barcod && !(/^\s*$/).test(barcod)) {
      updateCurated.sku = sku;
    }
    if (price && !isNaN(price)) {
      updateCurated.price = parseFloat(price);
    }
    if (stock && !isNaN(stock)) {
      updateCurated.stock = parseFloat(stock);
    }
    prdModel.updateProduct(
      req.params.id,
      updateCurated,
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });

  router.put('/products/del/:id', (req, res) => {
    prdModel.updateProduct(
      req.params.id,
      {"status":"INA"},
      (err, rslt) => {
        if (err) {
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      }
    );
  });

  return router;
}

module.exports = artesanosInit;
