const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id },'coco seceret',{
        expiresIn: 1 * 24 * 60 * 60 
    });
}

module.exports = createToken ;