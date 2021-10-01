const jwt = require('jsonwebtoken');
const User = require('../Models/Users');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwtUser;

    if (token) {
        jwt.verify(token,'coco seceret',(err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

const checkuser = (req,res,next) => {
    const token = req.cookies.jwtUser;

    if (token) {
        jwt.verify(token,'coco seceret',async (err,decodecToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null ;
                next();
            } else {
                let user = await User.findById(decodecToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null ;
        next();
    }
}

module.exports = {
    requireAuth,
    checkuser
}