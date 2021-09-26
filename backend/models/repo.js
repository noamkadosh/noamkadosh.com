const mongoose = require('mongoose');

const repoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    html_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        expires: '1d',
        default: Date.now
    }
});

module.exports = mongoose.model('Repo', repoSchema);