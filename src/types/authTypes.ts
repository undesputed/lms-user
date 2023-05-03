export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: string;
}

export type AuthActionTypes = LoginSuccessAction | LoginFailAction;
