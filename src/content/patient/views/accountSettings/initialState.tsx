import { State, SecurityState } from './types.d';

export const initialState: State = {
  profile: null,
  isError: false,
  errorMessage: '',
  loading: false,
  onUpdate: false,
  profileOpen: false,
  emailOpen: false,
  passOpen: false
};

export const securityInitialState: SecurityState = {
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  isError: false,
  errorMessage: '',
  onUpdate: false,
  severity: ''
};
