import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setProfile':
      return {
        ...state,
        profile: action.payload
      };
    // case 'setFirstName':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setLastName':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setMiddleName':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setPhone':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setAddress':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setSex':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setBirthday':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
    // case 'setEmail':
    //   return {
    //     ...state,
    //     profile: action.payload
    //   };
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
  }
};
