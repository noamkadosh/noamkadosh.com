const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const jwt_config = require('../config').jwt;
const User = require('../models/user');

const signupDisabled = true;

module.exports = {
  signup: ({ userInput }, request) => {
    if (signupDisabled) {
      const error =  new Error('Admin disabled signup option.');
      error.status = 403;
      error.msg = 'Admin disabled signup option.';
      throw(error);
    } else {
      // Validation
      const errors = [];
      if (!validator.isEmail(userInput.email)) {
        errors.push({ msg: 'Email invalid.' });
      }
      if (
        validator.isEmpty(userInput.password) ||
        !validator.isLength(userInput.password, { min: 6 })
      ) {
        errors.push({ msg: 'Password too short!' });
      }
      if (userInput.password !== userInput.passwordConfirmation) {
        errors.push({ msg: 'Passwords do not match.'});
      }
      if (errors.length > 0) {
        const error =  new Error('Invalid input.');
          error.status = 422;
          error.msg = 'Invalid input.';
          error.data = errors;
          throw(error);
      }
      // Handling data
      return bcrypt.hash(userInput.password, 12)
          .then(hash => {
              const user = new User({
                  email: userInput.email,
                  password: hash
              });
              return user.save()
                  .then(createdUser => {
                      const { __v, ...createdUserData } = createdUser._doc;
                      return {
                        ...createdUserData,
                        _id: createdUser._id.toString()
                      };
                  })
                  .catch(err => {
                      const error =  new Error(err);
                      error.status = 400;
                      error.msg = 'Unknown error occured.';
                      throw(error);
                  });
          })
          .catch(err => {
              const error =  new Error(err);
              error.status = 400;
              error.msg = 'Unknown error occured.';
              throw(error);
          });
      }
  },
  login: ({ userInput }, request) => {
    // Validation
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ msg: 'Email invalid.' });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 6 })
    ) {
      errors.push({ msg: 'Password too short!' });
    }
    if (errors.length > 0) {
      const error =  new Error('Invalid input.');
        error.status = 422;
        error.msg = 'Invalid input.';
        error.data = errors;
        throw(error);
    }
    // Handling data
    let fetchedUser;
    return User.findOne({
            email: userInput.email
        })
        .then(user => {
            if (!user) {
                const error =  new Error('One or more of your credentials is wrong.');
                error.status = 422;
                error.msg = 'One or more of your credentials is wrong.';
                throw(error);
            }
            fetchedUser = user;
            return bcrypt.compare(userInput.password, user.password)
              .then(result => {
                if (!result) {
                    const error =  new Error('One or more of your credentials is wrong.');
                    error.status = 422;
                    error.msg = 'One or more of your credentials is wrong.';
                    throw(error);
                }
                const token = jwt.sign({
                    email: fetchedUser.email,
                    id: fetchedUser._id,
                    created_at: Date.now()
                }, jwt_config.secret, {
                    expiresIn: '1h'
                });
                return {
                    email: user.email,
                    _id: user._id.toString(),
                    token: token,
                    expiresIn: 3600000
                };
            })
            .catch(err => {
                const error =  new Error(err);
                error.status = 422;
                error.msg = 'One or more of your credentials is wrong.';
                throw(error);
            });
        })
        .catch(err => {
            const error =  new Error(err);
            error.status = 422;
            error.msg = 'One or more of your credentials is wrong.';
            throw(error);
        });
  }
};
