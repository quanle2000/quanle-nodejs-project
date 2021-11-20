const categoryModel = require('../models/category.model');
module.exports = function(app) {
    app.use(async function (req, res, next) {
        if(req.session.isAuthenticated === null){
            req.session.isAuthenticated = false;
        }
        res.locals.lcAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;
        next();
      })

      app.use(async function (req, res, next) {
        const rows = await categoryModel.allWithDetail();
        res.locals.lcCategories = rows;
        next();
      })
}