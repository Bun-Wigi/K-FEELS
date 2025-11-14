import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../features/authSlice';
import '../index.css';
import { AppDispatch, RootState } from '../store';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    
    // Type the dispatch hook correctly using AppDispatch type from your store
    const dispatch = useDispatch<AppDispatch>(); 
    const navigate = useNavigate();
    
    // Use the RootState type for the state; fall back to any when auth slice is missing
    const { status, error } = useSelector((state: any) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await dispatch(authenticateUser({ email, password, mode }));
        
        // Check if authentication was successful and redirect
        if (authenticateUser.fulfilled.match(result) && result.payload.redirectTo) {
            navigate(result.payload.redirectTo);
        }
    };

    return (
        <div className="card">
            <div className="auth-container">
                <h2 className="auth-title">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
                
                {error && (
                    <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Register')}
                    </button>
                </form>
                
                <div className="auth-toggle">
                    <p>
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            type="button"
                            className="btn-link"
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        >
                            {mode === 'login' ? 'Register' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;