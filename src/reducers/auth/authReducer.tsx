import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'src/app/store';
import {
  patientAuth,
  patientRegistration,
  patientUpdatePassword
} from 'src/api/authAPI';

interface registerCreds {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  username: string;
  email: string;
  password: string;
}

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
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await patientAuth(credentials);
    sessionStorage.setItem('profile', response.token);
    return response.token;
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (credentials: registerCreds) => {
    const response = await patientRegistration(credentials);
    return response.message;
  }
);


export const authSlice = createSlice({
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
        state.token = action.payload;
        setToken(action.payload);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload;
      })
      .addCase(registerAsync.rejected, (state) => {
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
    console.error('Error parsing token:', error);
  }
};

export const { setToken, clearToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
