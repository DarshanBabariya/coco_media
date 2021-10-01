const User = require('../Models/Users');
const handleErrors = require('./handleErrors');
const createToken = require('./createToken');

const loginController_get = (req,res) => {
    res.render('login');
}

const loginController_post = async (req,res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login(email,password);

        const token = createToken(user._id);
        res.cookie('jwtUser',token,{ httpOnly: true, maxAge: 1000 * 1 * 24 * 60 * 60});

        res.status(200);
        res.json({user : user._id});
    } catch (err) {
        const error = handleErrors(err)
        res.status(400);
        res.json(error);
    }
}

module.exports = {
    loginController_get,
    loginController_post
}