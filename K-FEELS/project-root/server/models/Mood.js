const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;