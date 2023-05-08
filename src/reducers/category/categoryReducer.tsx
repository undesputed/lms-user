import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { category } from './category';
import { RootState } from 'src/app/store';
import produce from 'immer';
import { fetchAll } from 'src/api/category';

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
