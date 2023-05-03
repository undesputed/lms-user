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
    case 'setUserName':
      return {
        ...state,
        userName: action.payload
      };
    case 'setPhone':
      return {
        ...state,
        phone: action.payload
      };
    case 'setGender':
      return {
        ...state,
        gender: action.payload
      };
    case 'setBirthDate':
      return {
        ...state,
        birthDate: action.payload
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
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'registerSuccess':
      return {
        ...state, 
        helperText: action.payload,
        isError: false
      };
    case 'registerFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
};
