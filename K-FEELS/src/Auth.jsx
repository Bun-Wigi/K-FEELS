import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from './features/authentication/authSlice'; 

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticateUser({ email, password, mode }));
  };

  const handleModeChange = () => {
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
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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