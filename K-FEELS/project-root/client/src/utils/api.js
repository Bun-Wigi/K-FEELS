import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const fetchMoods = async () => {
    try {
        const response = await axios.get(`${API_URL}/moods`);
        return response.data;
    } catch (error) {
        console.error('Error fetching moods:', error);
        throw error;
    }
};

export const submitMood = async (moodData) => {
    try {
        const response = await axios.post(`${API_URL}/moods`, moodData);
        return response.data;
    } catch (error) {
        console.error('Error submitting mood:', error);
        throw error;
    }
};