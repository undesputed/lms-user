import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { Notification, NotificationCred } from './receptionistNotification';
import {
  createNotification,
  retrieveNotifById
} from 'src/api/receptionistNotification';

const notificationAdapter = createEntityAdapter<Notification>();

const initialState = notificationAdapter.getInitialState({
  status: 'idle',
  error: null
});

export const createNewNotification = createAsyncThunk(
  'receptionistNotification/createNewNotification',
  async (credentials: NotificationCred) => {
    const response = await createNotification(credentials);
    return response;
  }
);

export const fetchNotifByRequestId = createAsyncThunk(
  'receptionistNotification/fetchNotifById',
  async (id: number) => {
    const response = await retrieveNotifById(id);
    return response;
  }
);

const mapResponse = (response: Notification[]): Notification[] => {
  return response.map((item) => ({
    ...item,
    id: item.id,
    receptionist_id: item.receptionist_id,
    patient_request_id: item.patient_request_id,
    message: item.message,
    is_read: item.is_read,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
};

const receptionistNotificationSlice = createSlice({
  name: 'receptionistNotification',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifByRequestId.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifByRequestId.fulfilled, (state, action) => {
        const transformedPayload = mapResponse(action.payload);
        notificationAdapter.setAll(state, transformedPayload);
        state.status = 'succeeded';
      })
      .addCase(fetchNotifByRequestId.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(createNewNotification.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createNewNotification.fulfilled, (state, action) => {
        notificationAdapter.addOne(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(createNewNotification.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default receptionistNotificationSlice.reducer;

export const {
  selectAll: selectAllReceptionistNotification,
  selectById: selectAllReceptionistNotificationById,
  selectIds: selectAllReceptionistNotificationIds
} = notificationAdapter.getSelectors<RootState>(
  (state) => state.receptionistNotification
);
