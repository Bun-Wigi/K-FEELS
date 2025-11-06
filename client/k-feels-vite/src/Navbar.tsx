import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logout } from './slices/authSlice';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated, status } = useAppSelector((state) => state.auth);
    const isLoading = status === 'loading';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); 
    };

    const handleLoginClick = () => {
        navigate('/auth'); 
    };

    return (
        <nav className="header-nav">
            <div className="header-container">
                <div className="header-content">
                    <div className="header-auth-links">
                        {isAuthenticated && user ? (
                            <>
                                <span className="user-greeting">
                                    Welcome back, <span className="user-name">{user.name || user.email}</span>!
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="btn-logout" 
                                    aria-label="Logout"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging Out...' : 'Logout'}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLoginClick} 
                                className="btn-login" 
                                aria-label="Sign In"
                                disabled={isLoading}
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
