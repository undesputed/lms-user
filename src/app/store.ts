import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CounterReducer from 'src/reducers/counterReducer';
import AuthReducer from 'src/reducers/authReducer';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
