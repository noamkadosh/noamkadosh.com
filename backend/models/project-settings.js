const mongoose = require('mongoose');

const projectSettingsSchema = mongoose.Schema({
    project_count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ProjectSettings', projectSettingsSchema);