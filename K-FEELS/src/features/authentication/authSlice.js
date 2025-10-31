import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser', 
  async ({ email, password, mode }, { rejectWithValue }) => {
    const endpoint = mode === 'login' ? `${baseURL}/auth/login` : `${baseURL}/auth/register`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.user || !data.token) {
        return rejectWithValue(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { user: data.user, token: data.token };

    } catch (error) {
      return rejectWithValue('Could not connect to the server.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser || null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Authentication failed'; 
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;