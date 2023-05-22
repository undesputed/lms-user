import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setRequest':
      return {
        ...state,
        request: action.payload
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'setSnackBarStatus':
      return {
        ...state,
        snackBarStatus: action.payload
      };
  }
};
