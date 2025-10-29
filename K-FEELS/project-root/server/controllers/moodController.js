const Mood = require('../models/Mood');

// Get all moods
exports.getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.find();
        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving moods', error });
    }
};

// Create a new mood
exports.createMood = async (req, res) => {
    const newMood = new Mood(req.body);
    try {
        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: 'Error creating mood', error });
    }
};

// Update a mood
exports.updateMood = async (req, res) => {
    try {
        const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json(updatedMood);
    } catch (error) {
        res.status(400).json({ message: 'Error updating mood', error });
    }
};

// Delete a mood
exports.deleteMood = async (req, res) => {
    try {
        const deletedMood = await Mood.findByIdAndDelete(req.params.id);
        if (!deletedMood) {
            return res.status(404).json({ message: 'Mood not found' });
        }
        res.status(200).json({ message: 'Mood deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mood', error });
    }
};