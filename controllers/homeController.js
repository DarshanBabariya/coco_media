const Post = require('../Models/Posts');
const jwt = require('jsonwebtoken');

const home_get = async (req, res) => {

    const token = req.cookies.jwtUser;
    if(token){
        const user = jwt.verify(token, 'coco seceret');
        const userid = user.id;

        try {
            const post = await Post.countDocuments({ userid: userid });
            res.status(201);
            res.locals.totalpost = post;
            
            res.render('index');
        } catch (error) {
            res.status(400);
            console.log(error);
        }
    } else {
        res.render('index');
    }
}

module.exports = home_get;
