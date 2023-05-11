import { State, profileState } from './types.d';

export const initialState: State = {
  profile: null,
  isError: false,
  errorMessage: '',
  loading: false
};
