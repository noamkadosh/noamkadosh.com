const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profile_pic_url: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: [String]
    },
    date: {
        type: Number,
        required: true
    },
    profile_url: {
        type: String,
        required: true
    },
    tweet_url: {
        type: String,
        required: true
    },
    retweeted: {
        type: String
    },
    created_at: {
        type: Date,
        expires: '1d',
        default: Date.now
    }
});

module.exports = mongoose.model('Tweet', tweetSchema);