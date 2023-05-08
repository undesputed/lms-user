import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { subCategory } from './subCategory';
import { RootState } from 'src/app/store';
import { fetchAll } from 'src/api/subCategory';

const subCategoryAdapter = createEntityAdapter<subCategory>({
  selectId: (subCategory) => subCategory.id
});

const initialState = subCategoryAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchAllSubCategory: any = createAsyncThunk(
  'subCategory/fetchAll',
  async () => {
    const response = await fetchAll();
    return response;
  }
);

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subCategoryAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllSubCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { selectAll: selectAllSubCategory } =
  subCategoryAdapter.getSelectors((state: RootState) => state.subCategory);

export const selectSubCategory = createSelector(
  [selectAllSubCategory, (_, id) => id],
  (subCategory, id) => subCategory.find((subCategory) => subCategory.id === id)
);

export default subCategorySlice.reducer;
