import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { PaymentCreds, PaymentResponse } from './payment';
import { createNewPayment } from 'src/api/paymentAPI';

const paymentAdapter = createEntityAdapter<PaymentResponse>();

const initialState = paymentAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const insertNewPayment: any = createAsyncThunk(
  'payment/createNewPayment',
  async (credentials: PaymentCreds) => {
    const res = await createNewPayment(credentials);
    return res;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertNewPayment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(insertNewPayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        paymentAdapter.addOne(state, action);
      })
      .addCase(insertNewPayment.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default paymentSlice.reducer;

export const { selectAll: selectAllPayment } =
  paymentAdapter.getSelectors<RootState>((state) => state.payment);
