import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';


export interface User {
  id: string;
  email: string;
  name?: string; 
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface AuthFulfilledPayload {
  user: User;
  token: string;
}

interface AuthThunkArgs {
  email: string;
  password: string;
  mode: 'login' | 'register';
}

interface ThunkApiConfig {
    rejectValue: string; 
}

// ----------------------------------------------------------------------
// 2. INITIAL STATE
// ----------------------------------------------------------------------

const storedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');
const storedToken: string | null = localStorage.getItem('token');
const baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  status: 'idle',
  error: null,
};


// ----------------------------------------------------------------------
// 3. ASYNC THUNK (The function arguments are now correctly typed)
// ----------------------------------------------------------------------

export const authenticateUser = createAsyncThunk<
  AuthFulfilledPayload, 
  AuthThunkArgs, 
  ThunkApiConfig
>(
  'auth/authenticateUser', 
  async ({ email, password, mode }: AuthThunkArgs, thunkAPI) => {
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
        return thunkAPI.rejectWithValue(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return { user: data.user as User, token: data.token };

    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message || 'Could not connect to the server.');
    }
  }
);


// ----------------------------------------------------------------------
// 4. SLICE DEFINITION
// ----------------------------------------------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
      .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<AuthFulfilledPayload>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred'; 
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