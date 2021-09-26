const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    bold_text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('About', aboutSchema);