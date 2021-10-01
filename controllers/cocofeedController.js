const Post = require('../Models/Posts');
const User = require('../Models/Users');

const cocofeedController = async (req,res) => {

    try {
        const post = await Post.find({}).sort({_id : -1});
        const user = await User.find({}).sort({_id : -1});
 
        res.status(201);
        res.locals.post = post;
        res.locals.userdata = user;
        res.render('cocofeed');
    } catch (error) {
        
        res.status(400);
        console.log(error);
    }
}

const cocofeedController_like = (req,res) => {
    console.log(req.params);
    
    const likes = Post.findOneAndUpdate({ _id : req.params.id },
        { $inc: {
            likes : 1
        }
    })

    console.log(likes);

}

module.exports = {
    cocofeedController,
    cocofeedController_like
} ;