const express = require('express');
const exphbs  = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral');
require('express-async-errors');
const categoryModel = require('./models/category.model');


//app su dung thu vien express
const app = express();

const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {

   }
}))
app.use(express.urlencoded({
    extended: true
}))
// dinh nghia thu vien handlebar va duoi .handlebar thu vien
app.engine('handlebars', exphbs({
    //doi ten thu luc goc layout can khai bao de handlebar biet
    layoutsDir: 'views/_layouts',
    helpers:{
        section: hbs_sections(),
        format_number: function(value){
            return numeral(value).format ('0,0')+ ' đ';
        }
    }
}
));
//
app.set('view engine', 'handlebars');
// app.engine('.hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');
// server khi nhan duoc yeu cau duong dan /, goi den phuong thuc res tra ve noi dung cho web browser
app.use("/public",express.static('public'));

require("./middlewares/locals.mdw")(app);

app.get('/',function(req,res){
    res.render('home');
})

app.get('/about',function(req,res){
    res.render('about');
})

app.get('/bs', function(req,res){
    res.sendFile(__dirname + '/bs.html');
})

const categoryRouter = require('./routes/categories.route');
app.use('/admin/categories',categoryRouter);

const productRouter = require('./routes/product.route');
app.use('/admin/products',productRouter);

app.use('/account',require('./routes/_account.route'));
app.use('/products',require('./routes/_product.route'));

app.get('/err',function(req, res){
    throw new Error('ooopp its error hic!');
})
app.use(function(req,res){
    res.render('404',{layout: false})
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).render('500',{layout: false})
  })
// mo cong 3000 de tra ve respons ben tren cho web browser
const PORT = 3000;
//thong bao cho server biet noi dung respons da duong gui
app.listen(PORT,function(){
    console.log('kimochi uuuuuuuuuuuuuuuu :) !' );
})

//khong su dung view-engine
// const express = require('express');
// // yeu cau thu vien ex-handlebars
// const exphbs  = require('express-handlebars');
// const app = express();

// // server khi nhan duoc yeu cau duong dan /, goi den phuong thuc res tra ve noi dung cho web browser
// app.get('/',function(req,res){
//     res.send("hello express");
// })
// app.get('/bs', function(req,res){
//     res.sendFile(__dirname + '/bs.html');
// })
// // mo cong 3000 de tra ve respons ben tren cho web browser
// const PORT = 3000;
// //thong bao cho server biet noi dung respons da duong gui
// app.listen(PORT,function(){
//     console.log('dang chay roi day dit me may :) !' );
// })