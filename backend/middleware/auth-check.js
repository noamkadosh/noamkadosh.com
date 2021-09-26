const jwt = require('jsonwebtoken');

const jwt_config = require('../config').jwt;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwt_config.secret);
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Auth failed!'
        });
    }
};