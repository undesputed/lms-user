import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setProfile':
      return {
        ...state,
        profile: action.payload
      };
    case 'setRequest':
      return {
        ...state,
        request: action.payload
      };
    case 'setErrorMessage':
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
    case 'setSnackBarStatus':
      return {
        ...state,
        snackBarStatus: action.payload
      };
    case 'setOpenModal':
      return {
        ...state,
        modalStatus: action.payload
      };
    case 'setDateOfVisit':
      return {
        ...state,
        dateOfVisit: action.payload
      };
  }
};
