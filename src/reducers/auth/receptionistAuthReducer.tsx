import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { receptionistAuth } from 'src/api/receptionistAuth';
import { RootState, AppThunk } from 'src/app/store';

export interface AuthState {
  token: string;
  message: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  token: '',
  message: '',
  status: 'idle'
};

export const loginAsync = createAsyncThunk(
  'auth/receptionist/login',
  async (credential: { email: string; password: string }) => {
    const response = await receptionistAuth(credential);
    sessionStorage.setItem('profile', response.token);
    return response;
  }
);

export const receptionistAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
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
        state.token = action.payload.token;
        setToken(action.payload.token);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const getToken = () => {
  const token = sessionStorage.getItem('profile');
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken) {
      return decodedToken;
    }
  } catch (error) {
    console.error('Error parsing Token: ', error);
  }
};

export const { setToken, clearToken } = receptionistAuthSlice.actions;

export const selectToken = (state: RootState) => state.receptionistAuth.token;

export default receptionistAuthSlice.reducer;
