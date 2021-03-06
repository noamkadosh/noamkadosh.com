const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const jwt_config = require('../config').jwt;
const User = require('../models/user');

exports.signup = (req, res, next) => {
    // return res(401).json({
    //     message: 'Admin has disabled this option.'
    // });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error =  new Error('Invalid input.');
        error.status = 401;
        error.message = 'Invalid input.';
        error.errors = errors.array();
        return next(error);
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Signed up successfully.',
                    });
                })
                .catch(err => {
                    const error =  new Error(err);
                    error.status = 401;
                    error.message = 'Unknown error occured';
                    return next(error);
                });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'One or more of your credentials is wrong.';
            return next(error);
        });
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error =  new Error('Invalid input.');
        error.status = 401;
        error.message = 'Invalid input.';
        error.errors = errors.array();
        return next(error);
    }
    let fetchedUser;
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                const error =  new Error('One or more of your credentials is wrong.');
                error.status = 401;
                error.message = 'One or more of your credentials is wrong.';
                return next(error);
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
            .then(result => {
                if (!result) {
                    const error =  new Error('One or more of your credentials is wrong.');
                    error.status = 401;
                    error.message = 'One or more of your credentials is wrong.';
                    return next(error);
                }
                const token = jwt.sign({
                    email: fetchedUser.email,
                    id: fetchedUser._id
                }, jwt_config.secret, {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    message: 'Successfully logged in.',
                    token: token,
                    expiresIn: 3600
                });
            })
            .catch(err => {
                const error =  new Error(err);
                error.status = 401;
                error.message = 'One or more of your credentials is wrong.';
                return next(error);
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 401;
            error.message = 'One or more of your credentials is wrong.';
            return next(error);
        });
};
