import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import {
  completeForm,
  createRequestFormLabTest,
  deleteRequestFormLabTest,
  retrieveAllLabTestByFormId,
  retrieveAllRequestFormLabTest,
  retrieveAllRequestFormLabTestById,
  updateForm
} from 'src/api/requestFormLabTest';
import {
  RequestFormLabTest,
  RequestFormLabTestCred,
  deleteCreds
} from './requestFormLabTest';

const requestFormLabTestAdapter = createEntityAdapter<RequestFormLabTest>();

const initialState = requestFormLabTestAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const fetchAllRequestFormLabTest = createAsyncThunk(
  'requestFormLabTest/getAll',
  async () => {
    const response = await retrieveAllRequestFormLabTest();
    return response;
  }
);

export const fetchLabTestById = createAsyncThunk(
  'requestFormLabTest/fetchAllLabTestByFormId',
  async (id: number) => {
    const response = await retrieveAllRequestFormLabTestById(id);
    return response;
  }
);

export const fetchLabTestByRequestFormId = createAsyncThunk(
  'requestFormLabTest/fetchAllLabTestByRequestId',
  async (id: number) => {
    const response = await retrieveAllLabTestByFormId(id);
    return response;
  }
);

export const createLabTest = createAsyncThunk(
  'requestFormLabTest/createLabTest',
  async (credentials: RequestFormLabTestCred) => {
    const response = await createRequestFormLabTest(credentials);
    return response;
  }
);

export const updateAllForm = createAsyncThunk(
  'requestFormLabTest/updateLabTest',
  async (id: number) => {
    const res = await updateForm(id);
    return res;
  }
);

export const updateCompleteStatus = createAsyncThunk(
  'requestFormLabTest/completeLabTest',
  async (id: number) => {
    const res = await completeForm(id);
    return res;
  }
);

export const deleteLabTest = createAsyncThunk(
  'requestFormLabTest/deleteLabTest',
  async (credentials: { request_form_id: number; sub_category_id: number }) => {
    const response = await deleteRequestFormLabTest(credentials);
    return response;
  }
);

const mapResponseToRequestFormLabTest = (
  response: RequestFormLabTest[]
): RequestFormLabTest[] => {
  return response.map((item) => ({
    ...item,
    id: item.id,
    request_form_id: item.request_form_id,
    sub_category_id: item.sub_category_id,
    status: item.status,
    authBy: item.status,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at)
  }));
};

const requestFormLabTestSlice = createSlice({
  name: 'requestFormLabTest',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabTestById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLabTestById.fulfilled, (state, action) => {
        const transformedPayload = mapResponseToRequestFormLabTest(
          action.payload
        );
        requestFormLabTestAdapter.setAll(state, transformedPayload);
        state.status = 'succeeded';
      })
      .addCase(fetchLabTestById.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(createLabTest.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createLabTest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        requestFormLabTestAdapter.addOne(state, action.payload);
      })
      .addCase(createLabTest.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default requestFormLabTestSlice.reducer;

export const {
  selectAll: selectAllRequestFormLabTest,
  selectById: selectRequestFormlabTestById,
  selectIds: selectRequestFormLabTestIds
} = requestFormLabTestAdapter.getSelectors<RootState>(
  (state) => state.requestFormLabTest
);
