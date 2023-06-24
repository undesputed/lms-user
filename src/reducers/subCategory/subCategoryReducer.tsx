import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import {
  createCreds,
  createResponse,
  subCategory,
  updateCredentials
} from './subCategory';
import { RootState } from 'src/app/store';
import {
  create,
  deleteSubCategory,
  fetchAll,
  updateSubCategory
} from 'src/api/subCategory';

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

export const createNewSubCategory: any = createAsyncThunk(
  'subCategory/create',
  async (credential: createCreds) => {
    const res = await create(credential);
    return res;
  }
);

export const deleteSubCat: any = createAsyncThunk(
  'subCategory/delete',
  async (id: number) => {
    const res = await deleteSubCategory(id);
    return res;
  }
);

export const updateSubCat = createAsyncThunk(
  'subCategory/update',
  async (payload: { id: number; credential: updateCredentials }) => {
    const { id, credential } = payload;
    const res = await updateSubCategory(id, credential);
    return res;
  }
);
// const mapResponse = (response: subCategory[]): subCategory[] => {
//   return response.map((item) => ({
//     ...item,
//     iid: item.id,
//     category_id: item.category_id,
//     sub_category_name: item.sub_category_name,
//     price: item.price,
//     status: item.status,
//     authBy: item.authBy,
//     created_at: item.created_at,
//     updated_at: item.updated_at,
//     deleted_at: item.deleted_at
//   }));
// };

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
        // if (Array.isArray(action.payload)) {
        //   const payload = mapResponse(action.payload);
        //   subCategoryAdapter.setAll(state, payload);
        // }
      })
      .addCase(fetchAllSubCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewSubCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewSubCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subCategoryAdapter.upsertOne(state, action.payload);
      })
      .addCase(createNewSubCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSubCat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSubCat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subCategoryAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteSubCat.rejected, (state, action) => {
        state.status = 'failed';
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
