import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import produce from 'immer';
import {
  checkUserRequest,
  createRequestForm,
  retrieveAllPendingRequest,
  retrieveAllUserRequest,
  retrieveBasicInfoByFormId,
  retrieveFormByBasicInfo
} from 'src/api/requestFormAPI';
import { requestFormCred } from './requestForm';

export interface RequestForm {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  receivedBy: string | null;
  releasedBy: string | null;
  releaseDate: Date | null;
  created_at: Date;
  updated_at: Date | null;
}

interface APIRequestFormResponse {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  receivedBy: string | null;
  releasedBy: string | null;
  releaseDate: Date | null;
  created_at: Date;
  updated_at: Date | null;
}

const requestFormAdapter = createEntityAdapter<RequestForm>();

const initialState = requestFormAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchAllPendingRequest = createAsyncThunk(
  'requestForm/fetchAllPendingRequest',
  async () => {
    const res = await retrieveAllPendingRequest();
    return res;
  }
);

export const fetchPendingRequest = createAsyncThunk(
  'requestForm/fetchPendingRequest',
  async (id: number) => {
    const response = await checkUserRequest(id);
    return response;
  }
);

export const fetchAllUserRequest = createAsyncThunk(
  'requestForm/fetchAllUserRequest',
  async (id: number) => {
    const res = await retrieveAllUserRequest(id);
    return res;
  }
);

export const fetchAllBasicInfo = createAsyncThunk(
  'requestForm/fetchAllBasicInfo',
  async () => {
    const res = await retrieveFormByBasicInfo();
    return res;
  }
);

export const fetchBasicInfoByFormId = createAsyncThunk(
  'basicInfo/fetchInfoByFormId',
  async (id: number) => {
    const response = await retrieveBasicInfoByFormId(id);
    return response;
  }
);

export const createUserRequest = createAsyncThunk(
  'requestForm/createUserRequest',
  async (credentials: requestFormCred) => {
    const res = await createRequestForm(credentials);
    return res;
  }
);

const mapResponseToRequestForm = (
  response: APIRequestFormResponse[]
): RequestForm[] => {
  return response.map((item) => ({
    id: item.id,
    user_id: item.user_id,
    dateOfVisit: item.dateOfVisit,
    status: item.status,
    authBy: item.authBy,
    receivedBy: item.receivedBy,
    releasedBy: item.releasedBy,
    releaseDate: item.releaseDate,
    created_at: item.created_at ? new Date() : item.created_at,
    updated_at: item.updated_at ? new Date() : item.updated_at
  }));
};

const requestFormSlice = createSlice({
  name: 'requestForm',
  initialState: initialState,
  reducers: {
    requestFormAdded: {
      reducer(state, action: PayloadAction<RequestForm>) {
        const { payload } = action;
        requestFormAdapter.addOne(state, payload);
      },
      prepare(
        user_id: number,
        dateOfVisit: Date,
        status: number,
        authBy: number,
        receivedBy: string,
        releasedBy: string,
        releaseDate: Date,
        created_at: Date,
        updated_at: Date
      ) {
        return {
          payload: {
            id: Number(nanoid()),
            user_id,
            dateOfVisit,
            status,
            authBy,
            receivedBy,
            releasedBy,
            releaseDate,
            created_at,
            updated_at
          }
        };
      }
    },
    postUpdated(state, action) {
      const { id, status, authBy } = action.payload;
      const existingRequestForm = requestFormAdapter
        .getSelectors()
        .selectById(state, id);
      if (existingRequestForm) {
        existingRequestForm.status = status;
        existingRequestForm.authBy = authBy;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserRequest.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUserRequest.fulfilled, (state, action) => {
        const transformedPayload = mapResponseToRequestForm(action.payload);
        requestFormAdapter.setAll(state, transformedPayload);
        state.status = 'succeeded';
      })
      .addCase(fetchAllUserRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUserRequest.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(createUserRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const requestForm = mapResponseToRequestForm([action.payload])[0];
        requestFormAdapter.addOne(state, requestForm);
      })
      .addCase(createUserRequest.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default requestFormSlice.reducer;

export const { requestFormAdded, postUpdated } = requestFormSlice.actions;

export const {
  selectAll: selectAllRequestForm,
  selectById: selectRequestFormById,
  selectIds: selectRequestFormIds
} = requestFormAdapter.getSelectors<RootState>((state) => state.requestForm);

export const selectRequestFormsWithStatusOne = createSelector(
  selectAllRequestForm,
  (requestForms) => requestForms.filter((form) => form.status === 1)
);
