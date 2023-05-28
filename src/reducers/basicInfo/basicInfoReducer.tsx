import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { BasicInfoResponse, BasicInfoCred } from './basicInfo';
import { RootState } from 'src/app/store';
import { makeBasicInfo, retrieveAllBasicInfo } from 'src/api/basicInfoAPI';

const basicInfoAdapter = createEntityAdapter<BasicInfoResponse>();

const initialState = basicInfoAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchAllBasicInfo = createAsyncThunk(
  'basicInfo/fetchAll',
  async () => {
    const response = await retrieveAllBasicInfo();
    return response;
  }
);

export const createBasicInfo = createAsyncThunk(
  'basicInfo/createBasicInfo',
  async (credentials: BasicInfoCred) => {
    const response = await makeBasicInfo(credentials);
    return response;
  }
);

const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState: initialState,
  reducers: {
    basicInfoAdded: {
      reducer(state, action: PayloadAction<BasicInfoResponse>) {
        const { payload } = action;
        basicInfoAdapter.addOne(state, payload);
      },
      prepare(
        name: string,
        dateOfVisit: Date,
        phone: string,
        birthday: Date,
        gender: number,
        address: string,
        companyName: string,
        others: string,
        referredBy: string,
        dateRequested: Date,
        status: number,
        authBy: number,
        created_at: Date,
        updated_at: Date | null
      ) {
        return {
          payload: {
            id: Number(nanoid()),
            name,
            dateOfVisit,
            phone,
            birthday,
            gender,
            address,
            companyName,
            others,
            referredBy,
            dateRequested,
            status,
            authBy,
            created_at,
            updated_at
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBasicInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBasicInfo.fulfilled, (state, action) => {
        basicInfoAdapter.addMany(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchAllBasicInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBasicInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createBasicInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        basicInfoAdapter.addOne(state, action.payload);
      })
      .addCase(createBasicInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default basicInfoSlice.reducer;

export const { basicInfoAdded } = basicInfoSlice.actions;

export const { selectAll: selectAllBasicInfo, selectIds: selectBasicInfoIds } =
  basicInfoAdapter.getSelectors<RootState>((state) => state.basicInfo);
