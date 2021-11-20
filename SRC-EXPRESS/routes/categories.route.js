//khai bao ham controler chua duong dan va xu li
const { Router } = require("express");
const express = require("express");
const categoryModel = require('../models/category.model');
const router = express.Router();

router.get('/', async function(req,res){
    // const list =[
    //     {CatID:1, CatName: 'Laptop'},
    //     {CatID:1, CatName: 'SmartPhone'},
    //     {CatID:1, CatName: 'Tablet'}
    // ];

    // throw new Error('categories error')
    
    const list = await categoryModel.all();
    res.render('vwCategories/list',{
    //categories = list
    categories: list,
    empty: list.length === 0,
    });
})


router.get('/add',function(req,res){
    res.render('vwCategories/add',);
})
router.post('/add',async function(req,res){
    // const entity ={
    // CatName: req.body.txtCatName
    // }
    const rs = await categoryModel.add(req.body)
    console.log(rs);
    res.render('vwCategories/add');
})
router.get('/edit',async function(req,res){
    const id = +req.query.id || -1;
    const rows = await categoryModel.single(id);
    if(rows.length === 0)
    res.send('Invalid parameter');
    const Category = rows[0];
    res.render('vwCategories/edit',{Category});
})
router.post('/del',async function(req,res){
    await categoryModel.del(req.body.CatID);
    res.redirect('/admin/categories');
    // const entity ={
    // CatName: req.body.txtCatName
    // }
})
router.post('/update',async function(req,res){
    // const entity ={
    // CatName: req.body.txtCatName
    // }
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
})
module.exports = router;