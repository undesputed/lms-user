import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CounterReducer from 'src/reducers/counterReducer';
import AuthReducer from 'src/reducers/auth/authReducer';
import UserReducer from 'src/reducers/user/userReducer';
import CategoryReducer from 'src/reducers/category/categoryReducer';
import SubCategoryReducer from 'src/reducers/subCategory/subCategoryReducer';
import RequestFormReducer from 'src/reducers/requestForm/requestFormReducer';
import RequestFormLabTestReducer from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';
import ReceptionistNotificationReducer from 'src/reducers/receptionistNotification/receptionistNotificationReducer';
import ReceptionistAuthReducer from 'src/reducers/auth/receptionistAuthReducer';
import BasicInfoReducer from 'src/reducers/basicInfo/basicInfoReducer';
import PaymentReducer from 'src/reducers/payment/paymentReducer';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
    receptionistAuth: ReceptionistAuthReducer,
    users: UserReducer,
    category: CategoryReducer,
    subCategory: SubCategoryReducer,
    requestForm: RequestFormReducer,
    requestFormLabTest: RequestFormLabTestReducer,
    receptionistNotification: ReceptionistNotificationReducer,
    basicInfo: BasicInfoReducer,
    payment: PaymentReducer
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
