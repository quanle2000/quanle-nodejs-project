var mysql = require('mysql');
//tao bien config yeu cau su dung file cau hinh den database tron file default.js
//file default.json khong can export van nhan duoc
const config = require('../config/default.json');
// promise
var pool  = mysql.createPool(config.mysql);
module.exports = {
  load:function(sql){
    return new Promise(function(fn_done,fn_fail){
      pool.query(sql, function(error,results,fields){
        if(error){
        //throw error;
        //neu co loi goi ham fail 
        // ham fail quy dinh la ham phai nhan vao bien error
        //return khong tra ve gi la dung chung trinh
        fn_fail(error);
        return; 
        }
       // console.log(results);
       //neu khong co loi goi ham done,ham done quy dinh nhan bien results
       fn_done(results);
      });
  });
  },
  add: function (table, entity) {
    return new Promise(function(fn_done,fn_fail){
      const sql = `insert into ${table} set ?`;

      pool.query(sql,entity, function(error,results){
        if(error){
        //throw error;
        //neu co loi goi ham fail 
        // ham fail quy dinh la ham phai nhan vao bien error
        //return khong tra ve gi la dung chung trinh
        fn_fail(error);
        return; 
        }
        //console.log(results);
       //neu khong co loi goi ham done,ham done quy dinh nhan bien results
       fn_done(results);
      });
  });
  },
  patch: function (table, entity, condition) {
    return new Promise(function(fn_done,fn_fail){
      const sql = `update ${table} set ? where ?`;

      pool.query(sql,[entity, condition], function(error,results){
        if(error){
        //throw error;
        //neu co loi goi ham fail 
        // ham fail quy dinh la ham phai nhan vao bien error
        //return khong tra ve gi la dung chung trinh
        fn_fail(error);
        return; 
        }
       // console.log(results);
       //neu khong co loi goi ham done,ham done quy dinh nhan bien results
       fn_done(results);
      });
  });
  },
  del: function (table,condition) {
    return new Promise(function(fn_done,fn_fail){
      const sql = `delete from ${table} where ?`;

      pool.query(sql,condition, function(error,results){
        if(error){
        //throw error;
        //neu co loi goi ham fail 
        // ham fail quy dinh la ham phai nhan vao bien error
        //return khong tra ve gi la dung chung trinh
        fn_fail(error);
        return; 
        }
       // console.log(results);
       //neu khong co loi goi ham done,ham done quy dinh nhan bien results
       fn_done(results);
      });
  });
  }
}

    


// pooling 
// module.exports = {
//     load:function(sql,fn_done,fn_fail){
//       pool.query(sql, function(error,results,fields){
//         if(error){
//         //throw error;
//         //neu co loi goi ham fail 
//         // ham fail quy dinh la ham phai nhan vao bien error
//         //return khong tra ve gi la dung chung trinh
//         fn_fail(error);
//         return; 
//         }
//        // console.log(results);
//        //neu khong co loi goi ham done,ham done quy dinh nhan bien results
//        fn_done(results);
//       });
//   }
// };




// callback
// module.exports = {
//     // load:function(sql){
//       //tao ra ham moi fn_done nhan results(ket qua) va su li
//       // tao ra ham moi fn_fail su li loi
//       //sql thuc hien truy van dinh nghia ben app.js 'select * from users'
//       load:function(sql,fn_done,fn_fail){
//         //tao ket noi den doi tuong mysql chua cau hinh database
//         var cn = mysql.createConnection(config.mysql);
//         //ket noi den mysql database
//         cn.connect();
//         //tra ve loi neu co neu khong tra ve ketqua
//         cn.query(sql, function(error,results,fields){
//           if(error){
//             cn.end()
//           //throw error;
//           //neu co loi goi ham fail 
//           // ham fail quy dinh la ham phai nhan vao bien error
//           //return khong tra ve gi la dung chung trinh
//           fn_fail(error);
//           return; 
          
//           }
//          // console.log(results);
//          // goi xong fn_don dong ket noi lai
//          //neu khong co loi goi ham done,ham done quy dinh nhan bien results
//          fn_done(results);
//           cn.end();
//         });
//     }
// };