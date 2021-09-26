const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    contact_title: {
        type: String,
        required: true
    },
    contact_text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema);