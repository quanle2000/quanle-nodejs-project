const db = require('../utils/db');
const TBL_PRODUCTS = "products";
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_PRODUCTS}`);
    },
    allByCat: function(catID,limit,offset){
        return db.load(`select * from ${TBL_PRODUCTS} where CatID = ${catID} limit ${limit} offset ${offset}`);
    },
    countByCat: async function(catID,limit,offset){
        const rows = await db.load(`select count (*) as total from ${TBL_PRODUCTS} where CatID = ${catID}`);
        return rows[0].total;
    },
};