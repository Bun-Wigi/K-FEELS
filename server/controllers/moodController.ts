import { Request, Response } from 'express';
import Mood from '../models/Mood.js';

// Get all moods from the database
export const getMoods = async (_req: Request, res: Response): Promise<any> => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving moods', error });
  }
};

// Get a single mood by its ID
export const getMoodById = async (req: Request, res: Response): Promise<any> => {
  try {
    const mood = await Mood.findById(req.params.id);
    
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    
    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving mood', error });
  }
};

// Create a new mood
export const createMood = async (req: Request, res: Response): Promise<any> => {
  try {
    const newMood = new Mood(req.body);
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (error) {
    res.status(400).json({ message: 'Error creating mood', error });
  }
};

// Update an existing mood
export const updateMood = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }  // Return the updated document
    );
    
    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(400).json({ message: 'Error updating mood', error });
  }
};

// Delete a mood
export const deleteMood = async (req: Request, res: Response): Promise<any> => {
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
