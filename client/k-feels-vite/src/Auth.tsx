
import { useState, useEffect, type FormEvent, type ChangeEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from './slices/authSlice'; 

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

function Auth() {
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();
  
  const { isAuthenticated, status, error } = useAppSelector((state) => state.auth);

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login'); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
   
    dispatch(authenticateUser({ email, password, mode }));
  };


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleModeChange = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMode(mode === 'login' ? 'register' : 'login');
    setEmail('');
    setPassword('');
  };

  const isLoading = status === 'loading';

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading} 
        >
          {isLoading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
        </button>
      </form>
      
      {status === 'failed' && error && (
        <p>Error: {error}</p>
      )}

      <p>
        {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
        <button
          onClick={handleModeChange}
          disabled={isLoading}
        >
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Auth;
