const express = require('express');
const { body } = require('express-validator');

const authCheck = require('../middleware/auth-check');

const twitterController = require('../controllers/twitter');

const router = express.Router();

// /twitter-settings => GET
router.get('/twitter-settings', twitterController.getSettings);

// /twitter-settings => POST
router.post('/twitter-settings', body('tweet_count', 'Invalid input.').isInt([{
    min: 1, 
    max: 5
}]), authCheck, twitterController.postSettings);

// /twitter-settings => PUT
router.put('/twitter-settings/:id', body('tweet_count', 'Invalid input.').isInt([{
    min: 1, 
    max: 5
}]), authCheck, twitterController.putSettings);

// /twitter => GET
router.get('/twitter', twitterController.getTweets);

module.exports = router;
