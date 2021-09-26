const mongoose = require('mongoose');

const timelineItemSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('TimelineItem', timelineItemSchema);