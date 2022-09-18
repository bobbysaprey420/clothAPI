const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

function isAuthorized(req, res, next) {
    let token = req.headers['x-auth-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, verifiedJwt) => {
            if (err) {
                var err = new Error('Invalid token');
                err.status = 403;
                return next(err);
            } else {
                res.locals.role=verifiedJwt.role;
                return next()
            }
        })
    }
    else {
        var err = new Error('Not authorized! Go back!');
        err.status = 401;
        return next(err);
    }
}

function validId(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        var err = new Error('The product with the given ID was not found');
        err.status = 404;
        return next(err);
    }
    next();
}

function permission(req,res,next) {
    if (res.locals.role === process.env.ADMIN_ROLE) {
        return next();
    }
    var err = new Error('Not Authorized');
    err.status = 401;
    return next(err);
}

module.exports = { isAuthorized, validId, permission }
