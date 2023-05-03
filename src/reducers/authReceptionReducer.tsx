import {
  AuthState,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from 'src/types/authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
  error: null
};

const authReceptionReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        error: null
      };
    case LOGIN_FAIL:
      return {
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReceptionReducer;
