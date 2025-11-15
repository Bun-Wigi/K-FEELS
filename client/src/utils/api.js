import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5172/api';

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

export const fetchKDramas = async (genreId = null) => {
    try {
        const url = genreId 
            ? `${API_URL}/kdramas?genreId=${genreId}`
            : `${API_URL}/kdramas`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching K-dramas:', error);
        throw error;
    }
};