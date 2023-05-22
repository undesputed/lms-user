import { State } from './types.d';

export const initialState: State = {
  profile: null,
  request: null,
  dateOfVisit: new Date(),
  isError: false,
  errorMessage: '',
  loading: false,
  snackBarStatus: false,
  modalStatus: false
};
