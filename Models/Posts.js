const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide an Title of Post.'],
    },
    content: {
        type: String,
        required: [true, 'Please provide an Content of Post.'],
    },
    createdat: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('posts',postSchema);