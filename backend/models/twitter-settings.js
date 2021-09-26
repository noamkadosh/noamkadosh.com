const mongoose = require('mongoose');

const twitterSettingsSchema = mongoose.Schema({
    tweet_count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('TwitterSettings', twitterSettingsSchema);