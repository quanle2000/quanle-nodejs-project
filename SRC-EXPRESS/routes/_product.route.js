//khai bao ham controler chua duong dan va xu li
const express = require("express");
const productModel = require('../models/product.model')
const router = express.Router();
const config = require("../config/default.json");
router.get('/byCat/:catID', async function(req,res){
    // const list =[
    //     {CatID:1, CatName: 'Laptop'},
    //     {CatID:1, CatName: 'SmartPhone'},
    //     {CatID:1, CatName: 'Tablet'}
    // ];
    for (const c of res.locals.lcCategories) {
        if (c.CatID === +req.params.catID) {
            c.isActive = true;
        }
    }
    // const limit = 6;
    const page = +req.query.page || 1;
    if(page<1) page = 1;

    const offset = (page-1)*config.pagination.limit;
    //neu thoa dieu kien luc nay tung du lieu danh muc trong catID se co truong Catid CatName SanPham va them truong isActive
    //const list = await productModel.allByCat(req.params.catID,config.pagination.limit, offset);

    //tinh so trang san pham
    //const total = await productModel.countByCat(req.params.catID);
    
    //chay song song hai ham total va list 
    const [list, total]=await Promise.all([
        await productModel.allByCat(req.params.catID,config.pagination.limit, offset),
        await productModel.countByCat(req.params.catID)
    ]);
    const nPages = Math.ceil(total/config.pagination.limit);
    console.log(nPages);

    //tao ra mang de lap ra n trang giong nhau
    const page_items = [];
    for(let i = 1; i<=nPages; i++){
        const item = {
            value: i,
            isActive: i===page,
        }
        page_items.push(item);
    }
    console.log(page_items);
    res.render('vwProduct/byCat',{
    //products = list
    products: list,
    empty: list.length === 0,
    page_items,
    prev_value: page - 1,
    next_value: page + 1,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    });
})
module.exports = router;