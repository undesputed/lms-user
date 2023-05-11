import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFirstName':
      return {
        ...state,
        firstName: action.payload
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.payload
      };
    case 'setMiddleName':
      return {
        ...state,
        lastName: action.payload
      };
    case 'setUserName':
      return {
        ...state,
        username: action.payload
      };
    case 'setPhone':
      return {
        ...state,
        phone: action.payload
      };
    case 'setAddress':
      return {
        ...state,
        address: action.payload
      };
    case 'setGender':
      return {
        ...state,
        sex: action.payload
      };
    case 'setBirthDate':
      return {
        ...state,
        birthday: action.payload
      };
    case 'setAge':
      return {
        ...state,
        age: action.payload
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setConfirmPassword':
      return {
        ...state,
        confirmPassword: action.payload
      };
    case 'setError':
      return {
        ...state,
        error: action.payload
      };
    case 'setErrorMessage':
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'setEmailExists':
      return {
        ...state,
        emailExists: action.payload
      };
    case 'setEmailExistsMessage':
      return {
        ...state,
        emailExistsMessage: action.payload
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload
      };
    case 'setLoginSuccess':
      return {
        ...state,
        loginSuccess: action.payload
      };
  }
};
