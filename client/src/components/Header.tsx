import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import '../header.css';

interface AuthState {
    authenticated: boolean;
    user: string;
}

const selectAuth = (state: { auth: AuthState }) => state.auth;

const selectAuthenticatedUser = createSelector(
    [selectAuth],
    (auth) => ({
        authenticated: auth.authenticated || false,
        user: auth.user?.split('@')[0] || 'Guest',
    })
);

const Header = () => {
    const { authenticated, user } = useSelector(selectAuthenticatedUser);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch({ type: 'auth/signOut' });
    };

    const handleSignIn = () => {
        dispatch({ type: 'auth/logIn' });
    };

    if (authenticated) {
        return (
            <header>
                <nav>
                    <p> Hello {user}!</p>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/favorites">Favorites</a></li>
                        <li><button onClick={handleSignOut}>Sign Out</button></li>
                    </ul>
                </nav>
            </header>
        );
    }

    return (
        <header>
            <nav>
                <p> Hello {user}!</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/favorites">Favorites</a></li>
                    <li><button onClick={handleSignIn}>Sign In</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;