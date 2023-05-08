import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'src/app/store';
import { patientAuth } from 'src/api/authAPI';

export interface AuthState {
  token: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  token: null,
  status: 'idle'
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await patientAuth(credentials);
    return response.token;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('profile', action.payload);
      state.token = action.payload;
    },
    clearToken: (state) => {
      localStorage.clear();
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const getToken = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const decodedToken = JSON.parse(atob(profile.data.token.split('.')[1]));
  if (decodedToken) {
    return decodedToken;
  }
};

export const { setToken, clearToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
