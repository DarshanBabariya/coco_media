const Post = require('../Models/Posts');
const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const handleerror = require('./handleErrors');

const mypostsController_get = async (req, res) => {

    try {
        const token = req.cookies.jwtUser;
        const user = jwt.verify(token, 'coco seceret');
        const userid = user.id;

        const posts = await Post.find({ userid }).sort({_id : -1});

        res.locals.posts = posts;
        
        res.render('myposts');

    } catch (error) {
        res.status(400);
        console.log(error);
    }
}
const mypostsController_post = async (req, res) => {
    const { title, content, createdat } = req.body;

    const token = req.cookies.jwtUser;
    const user = jwt.verify(token, 'coco seceret');
    const userid = user.id;

    try {
        const post = await Post.create({ userid, title, content, createdat });
        res.status(201);
        res.json(post);
    } catch (error) {
        const err = handleerror(error);
        res.status(400);
        res.json(err);
    }
}

const mypostsController_delete = async (req, res) => {
    try {
        const postDelete = await Post.deleteOne({ _id: req.params.id });
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const mypostsController_like = (req,res) => {
    console.log(req.params);
}

module.exports = {
    mypostsController_get,
    mypostsController_post,
    mypostsController_delete,
    mypostsController_like
};