import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import '../header.css';

// Update interface to match your authSlice
interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        email: string;
        name?: string;
    } | null;
}

const selectAuth = (state: { auth: AuthState }) => state.auth;

const selectAuthenticatedUser = createSelector(
    [selectAuth],
    (auth) => ({
        authenticated: auth.isAuthenticated || false,
        user: auth.user?.email?.split('@')[0] || auth.user?.name || 'Guest',
    })
);

const Header = () => {
    const { authenticated, user } = useSelector(selectAuthenticatedUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(logout());
    };

    const handleSignIn = () => {
        console.log('Redirect to login');
        navigate('/login');
    };

    // ...rest of your existing JSX code stays the same...
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