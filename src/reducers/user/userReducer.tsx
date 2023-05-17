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
import {
  retrievePatientById,
  updatePatientById,
  updateEmailPatientById
} from 'src/api/userAPI';
import { patientUpdatePassword } from 'src/api/authAPI';

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
interface updatePasswordCreds {
  email: string;
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

const userAdapter = createEntityAdapter<userInterface>();

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

export const updateProfileById = createAsyncThunk(
  'user/updateDetail',
  async ({ id, userData }: { id: number; userData: any }) => {
    const res = await updatePatientById(id, userData);
    return { id: id, changes: userData };
  }
);

export const updateEmailById = createAsyncThunk(
  'user/updateEmail',
  async ({ id, userData }: { id: number; userData: any }) => {
    const res = await updateEmailPatientById(id, userData);
    return { id: id, changes: userData };
  }
);

// export const updatePassAsync = createAsyncThunk(
//   'auth/updatePassword',
//   async ({
//     id,
//     credentials
//   }: {
//     id: number;
//     credentials: updatePasswordCreds;
//   }) => {
//     const response = await patientUpdatePassword(credentials);
//     return { id: id, email: response.email, password: response.password };
//   }
// );

export const updatePassAsync = createAsyncThunk(
  'auth/updatePassword',
  async (credentials: updatePasswordCreds) => {
    const response = await patientUpdatePassword(credentials);
    return { email: response.email, password: response.password };
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
      .addCase(updateProfileById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateEmailById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmailById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        userAdapter.updateOne(state, action.payload);
      })
      .addCase(updateEmailById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updatePassAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePassAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { email, password } = action.payload;

        // Find the user by email and update their password
        const userToUpdate = Object.values(state.entities).find(
          (user: userInterface) => user.email === email
        );

        if (userToUpdate) {
          userAdapter.updateOne(state, {
            id: userToUpdate.id,
            changes: { password }
          });
        }
      })
      .addCase(updatePassAsync.rejected, (state) => {
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
