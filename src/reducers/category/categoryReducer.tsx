import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { category, categoryCredentials, createCredential } from './category';
import { RootState } from 'src/app/store';
import produce from 'immer';
import { createCategory, fetchAll, updateCategory } from 'src/api/category';

const categoryAdapter = createEntityAdapter<category>({
  selectId: (category) => category.id
});

const initialState = categoryAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchAllCategory: any = createAsyncThunk(
  'category/fetchAll',
  async () => {
    const response = await fetchAll();
    return response;
  }
);

export const updateCat: any = createAsyncThunk(
  'category/update',
  async (payload: { id: number; credential: categoryCredentials }) => {
    const { id, credential } = payload;
    const res = await updateCategory(id, credential);
    return res;
  }
);

export const createCat: any = createAsyncThunk(
  'category/create',
  async (credential: createCredential) => {
    const res = await createCategory(credential);
    return res;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoryAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoryAdapter.updateOne(state, action.payload);
      })
      .addCase(updateCat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoryAdapter.upsertOne(state, action);
      })
      .addCase(createCat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { selectAll: selectAllCategory } = categoryAdapter.getSelectors(
  (state: RootState) => state.category
);

export const selectCategory = createSelector(
  [selectAllCategory, (_, id) => id],
  (category, id) => category.find((category) => category.id === id)
);

export default categorySlice.reducer;
