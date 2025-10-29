import React from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
    const moodResults = useSelector((state) => state.mood.results);

    return (
        <div>
            <h1>Mood Quiz Results</h1>
            {moodResults.length > 0 ? (
                <ul>
                    {moodResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            ) : (
                <p>No results available.</p>
            )}
        </div>
    );
};

export default Results;