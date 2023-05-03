import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../types/authTypes';
import axios from 'axios';

export const login =
  (
    email: any,
    password: string,
    navigate: any
  ): ThunkAction<void, RootState, null, any> =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      dispatch({ type: LOGIN_SUCCESS });
      navigate('/dashboard');
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
    }
  };
