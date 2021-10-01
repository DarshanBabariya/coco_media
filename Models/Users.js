const mongoose = require('mongoose');
const { isEmail, isAlpha } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide a First Name.'],
        validate: [isAlpha, 'Please enter a valid First Name.']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a Last Name.'],
        validate: [isAlpha, 'Please enter a valid Last Name.']
    },
    email: {
        type: String,
        require: [true, 'Plase provide an Email Address.'],
        unique: true,
        lowercase: [true, 'Please enter a Email in lowercase.'],
        validate: [isEmail, 'Please enter a valid Email Address.']
    },
    password: {
        type: String,
        require: [true, 'Please provide a Password.'],
        minlength: [6, 'Password length must be six charecter long.']
    }
})

// hashing a password 
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password,user.password);

        if (auth) {
            return user;
        } else {
            throw Error('Incorrect Password');
        }
    } else {
        throw Error('Incorrect Email');
    }
}


module.exports = mongoose.model('users',userSchema);