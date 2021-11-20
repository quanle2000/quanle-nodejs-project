//khai bao ham controler chua duong dan va xu li
const express = require("express");
const moment = require('moment');
const bcrypt = require('bcryptjs');
const config = require("../config/default.json");
const userModel = require("../models/user.model");
const restrict = require('../middlewares/auth.mdw');
const router = express.Router();

router.get('/login', async function(req,res){
    res.render('vwAccount/login',{
        layout:false,
    });
})
router.post('/login', async function(req,res){
    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.render('vwAccount/login',{
            layout: false,
            err: 'invalid username or password'
        })
    };
    const rs = bcrypt.compareSync(req.body.password, user.password_hash);
    if(rs===false){
        return res.render('vwAccount/login',{
            layout: false,
            err: 'invalid username or password'
        })
    };
    delete user.password_hash
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    res.redirect('/account/profile')
})  
router.get('/logout',restrict, function(req,res){
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer); //tra ve trang truoc no
})
router.get('/register', async function(req,res){
    res.render('vwAccount/register');
})
router.post('/register', async function(req,res){
    const dob = moment(req.body.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const password_hash = bcrypt.hashSync(req.body.password, config.authentication.saltRounds);
    const entity={
        username: req.body.username,
        password_hash,
        name: req.body.name,
        email: req.body.email,
        dob,
        permission: 0,
    }
    console.log(entity);
    await userModel.add(entity);
    res.render('vwAccount/register');
})
router.get('/profile',restrict, async function(req,res){
    console.log(req.session.authUser)
    res.render('vwAccount/profile');
})
module.exports = router;