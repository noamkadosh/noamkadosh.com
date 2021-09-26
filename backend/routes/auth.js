const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

// /auth/login => POST
router.post('/auth/login', 
    body('email', 'Invalid input.').isEmail(), 
    body('password', 'Invalid input.').isLength({ min: 6 }), 
    authController.login);

// /auth/signup => POST
router.post('/auth/signup',
    body('email', 'Invalid input.').isEmail(), 
    body('password', 'Invalid input.').isLength({ min: 6 }),
    async (req, res, next) => {
        await body('password', 'Passwords do not match.')
            .equals(req.body.passwordConfirmation)
            .run(req);
        next();
    },
    authController.signup);

module.exports = router;
