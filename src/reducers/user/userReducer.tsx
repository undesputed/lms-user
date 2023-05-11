import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/app/store';
import produce from 'immer';
import { retrievePatientById, updatePatientById } from 'src/api/userAPI';

export interface userInterface {
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  username: string | null;
  email: string | null;
  emailVerifiedAt: number;
  password: string | null;
  rememberToken: string | null;
  exp: number | null;
  userType: string | null;
  loginType: string | null;
  authBy: number | null;
  status: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

const userAdapter = createEntityAdapter<userInterface>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
});

const initialState = userAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchUserById: any = createAsyncThunk(
  'user/fetchUserById',
  async (id: number) => {
    const response = await retrievePatientById(id);
    return response;
  }
);

export const updateProfileById: any = createAsyncThunk(
  'user/updateDetail',
  async (id: number, userData: any) => {
    const res = await updatePatientById(id, userData);
    return res;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        userAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProfileById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfileById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(updateProfileById, (state) => {
        state.status = 'failed';
      });
  }
});

export const { selectAll: selectAllUsers } = userAdapter.getSelectors(
  (state: RootState) => state.users
);

export const selectUserById = createSelector(
  [selectAllUsers, (_, id) => id],
  (users, id) => users.find((user) => user.id === id)
);

export default userSlice.reducer;
