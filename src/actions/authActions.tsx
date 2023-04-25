import * as api from '../api/api';
import { AUTH, CREATE_PROFILE } from './constants';
import { Dispatch } from 'redux';

export const login = (formData: any, setLoading: any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, payload: data }); // return a valid action object with a payload property
    // window.location.href = '/dashboards';
  } catch (error) {
    setLoading(false);
  }
};
