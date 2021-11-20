//khai bao ham controler chua duong dan va xu li
const express = require("express");
const productModel = require('../models/product.model')
const router = express.Router();
router.get('/', async function(req,res){
    // const list =[
    //     {CatID:1, CatName: 'Laptop'},
    //     {CatID:1, CatName: 'SmartPhone'},
    //     {CatID:1, CatName: 'Tablet'}
    // ];
    const list = await productModel.all();
    res.render('vwProduct/list',{
    //categories = list
    products: list,
    empty: list.length === 0,
    });
})
module.exports = router;