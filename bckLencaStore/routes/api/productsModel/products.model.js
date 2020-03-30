var ObjectID = require('mongodb').ObjectID;
var hasIndexOwner = false;
var hasIndexSku = false;

var productsModelInit = function(db){
  var productModel = {};
  var prdColl = db.collection('products');
  if (!hasIndexOwner) {
    prdColl.indexExists("owner_id_1", (err, rslt) => {
      if (!rslt) {
        prdColl.createIndex(
          { ownerID: 1 },
          { name: "owner_id_1" },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexOwner = true;
          });
      } else {
        hasIndexOwner = true;
      }
    });
    prdColl.indexExists("sku_1", (err, rslt) => {
      if (!rslt) {
        prdColl.createIndex(
          { sku: 1 },
          { unique:true, name: "sku_1" },
          (err, rslt) => {
            console.log(err, rslt);
            hasIndexSku = true;
          });
      } else {
        hasIndexSku = true;
      }
    });
  }
  productModel.pseudoSchema = {
    name:'',
    sku:'',
    barcod:'',
    imgUrl:'',
    price:'',
    ownerId: null,
    ownerName: '',
    stock: 0,
    dateCreated:0,
    status:'ACT',
    comments: [],
    abc:''
  }
  productModel.getProductByOwner = async (ownerId, customFilter, _page, _itemsPerPage, _sortBy, handler)=>{
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 25;
    var customFilterf = customFilter || {};
    var sortBy = _sortBy || "sku";
    var filter = {ownerId : new ObjectID(ownerId), ...customFilterf};
    var options = {
      "limit": itemsPerPage,
      "skip": ((page - 1) * itemsPerPage),
      "projection": {
        "name": 1, "sku":1, "barcod": 1, "price": 1, "stock":1
      },
      "sort": [[sortBy, 1]]
    };
    let cursor = prdColl.find(filter, options);
    let totalProds = await cursor.count();
    cursor.toArray((err, docs)=>{
      if (err) {
          console.log(err);
          return handler(err, null);
      } else {
          return handler(null, {total: totalProds, products: docs});
      }
    });
  }; // getProductByOwner

  productModel.getProductByFilter = async (customFilter, _page, _itemsPerPage, _sortBy, handler) => {
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 25;
    var customFilterf = customFilter || {};
    var sortBy = _sortBy || "sku";
    var filter = {...customFilterf };
    var options = {
      "limit": itemsPerPage,
      "skip": ((page - 1) * itemsPerPage),
      "projection": {
        "name": 1, "sku": 1, "barcod": 1, "price": 1, "stock": 1
      },
      "sort": [[sortBy, 1]]
    };
    let cursor = prdColl.find(filter, options);
    let totalProds = await cursor.count();
    cursor.toArray((err, docs) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, { total: totalProds, products: docs });
      }
    });
  }; // getProductByFilter

  productModel.getProductById = (prodId, handler) => {
      var filter= {"_id": new ObjectID(prodId)};
      prdColl.findOne(filter, (err, doc)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, doc);
        }
      });
  }; // getProductById

  productModel.addNewProduct = ( ownerId, ownerName, productInput, handler) => {
    var newProducto = {
      ...productModel.pseudoSchema,
      ...productInput
    }
    newProducto.dateCreated = new Date().getTime();
    newProducto.ownerId= new ObjectID(ownerId);
    newProducto.ownerName= ownerName;
    prdColl.insertOne(newProducto, (err, rslt)=>{
      if(err){
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.ops[0]);
      }
    }); //insertOne
  }; //addNewProduct


  productModel.updateProduct = (prodId, productInput, handler) => {
    var filter = { "_id": new ObjectID(prodId) };
    var { name, barcod, imgUrl, price} = productInput;
    var finalUpdate = {};
    if(name){
      finalUpdate.name = name;
    }
    if(barcod){
      finalUpdate.barcod = barcod;
    }
    if(imgUrl){
      finalUpdate.imgUrl = imgUrl;
    }
    if(price){
      finalUpdate.price = price;
    }
    var updateCmd = { "$set": finalUpdate };
    prdColl.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      } else {
        return handler(null, rslt.value);
      }
    })
  }; //addStockToProduct

  productModel.addStockToProduct = (prodId, stockAmount, handler) => {
    var filter = {"_id": new ObjectID(prodId)};
    var updateCmd = {"$inc": {"stock": stockAmount}};
    prdColl.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, rslt.value);
        }
    })
  }; //addStockToProduct


  return productModel;
};

module.exports = productsModelInit;
