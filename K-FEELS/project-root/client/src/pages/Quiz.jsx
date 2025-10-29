import React, { useState } from 'react';

const Quiz = () => {
    const [mood, setMood] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        // Here you would typically dispatch an action to save the mood
    };

    return (
        <div>
            <h1>Mood Quiz</h1>
            {submitted ? (
                <p>Your mood has been recorded: {mood}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        How are you feeling?
                        <input
                            type="text"
                            value={mood}
                            onChange={handleMoodChange}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Quiz;