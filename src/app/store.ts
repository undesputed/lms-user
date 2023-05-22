import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CounterReducer from 'src/reducers/counterReducer';
import AuthReducer from 'src/reducers/auth/authReducer';
import UserReducer from 'src/reducers/user/userReducer';
import CategoryReducer from 'src/reducers/category/categoryReducer';
import SubCategoryReducer from 'src/reducers/subCategory/subCategoryReducer';
import RequestFormReducer from 'src/reducers/requestForm/requestFormReducer';
import RequestFormLabTestReducer from 'src/reducers/requestFormLabTest/requestFormLabTestReducer';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
    users: UserReducer,
    category: CategoryReducer,
    subCategory: SubCategoryReducer,
    requestForm: RequestFormReducer,
    requestFormLabTest: RequestFormLabTestReducer
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
