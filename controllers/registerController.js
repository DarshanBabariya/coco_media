const Users = require('../Models/Users');
const handleErrors = require('./handleErrors');
const jwt = require('jsonwebtoken');
const createToken = require('./createToken');

const registerController_get = (req,res) => {
   
    res.locals.error = null ;

    res.render('register');

}

const registerController_post = async (req,res) => {
    let { firstname, lastname, email, password } = req.body;

    try {
        const user = await Users.create({ firstname, lastname, email, password });

        const token = createToken(user._id);
        
        res.cookie('jwtUser',token,{ httpOnly: true, maxAge: 1000 * 1 * 24 * 60 * 60});
        res.json({user : user._id});
    } catch(err) {
        const error = handleErrors(err);
        res.status(400);
        res.json(error);
    }
}

module.exports = {
    registerController_get,
    registerController_post
}