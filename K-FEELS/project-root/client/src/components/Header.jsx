import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Mood Tracker</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/quiz">Quiz</a></li>
                    <li><a href="/results">Results</a></li>
                    <li><a href="/favorites">Favorites</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;