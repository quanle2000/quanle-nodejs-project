//file này lưu dữ liệu xử lí dữ liệu lấy dữ liệu
const db = require('../utils/db');

const TBL_USERS = "users_clc";
module.exports ={
    all: function(){
        return db.load(`select * from ${TBL_USERS}`);
    },
    single: function(id){
        return db.load(`select * from ${TBL_USERS} id = ${id}`);
    }, 
    singleByUserName: async function(username){
        const rows = await db.load(`select * from ${TBL_USERS} where username = '${username}'`);

        if(rows.length === 0)
            return null;
        
        return rows[0];
    },
    add: function(entity) {
        return db.add(TBL_USERS,entity);
    },
    patch: function(entity) {
        const condition = {
            id : entity.id
        }
        delete entity.id;
        return db.patch(TBL_USERS,entity,condition);
    },
    del: function(id) {
        const condition = { id }
        return db.del(TBL_USERS,condition);
    }
}