const express = require('express');
const mongoose = require('mongoose');
const Cocoroutes = require('./routes/routes');
const authMiddleware = require('./Middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://darshan:darshan2000@cluster0.ny8zc.mongodb.net/coco?retryWrites=true&w=majority'
).then(() => {
    console.log("db succesfully connected.!!");
}).catch((err) => {
    console.log(err);
})

app.get('*',authMiddleware.checkuser);
app.use(Cocoroutes);

app.listen(8080);



