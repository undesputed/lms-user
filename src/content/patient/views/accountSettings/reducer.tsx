import { Action, State, SecurityState, SecurityAction } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setProfile':
      return {
        ...state,
        profile: action.payload
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
    case 'setOnUpdate':
      return {
        ...state,
        onUpdate: action.payload
      };
    case 'setProfileOpen':
      return {
        ...state,
        profileOpen: action.payload
      };
    case 'setEmailOpen':
      return {
        ...state,
        emailOpen: action.payload
      };
    case 'setPassOpen':
      return {
        ...state,
        passOpen: action.payload
      };
  }
};

export const securityReducer = (
  state: SecurityState,
  action: SecurityAction
): SecurityState => {
  switch (action.type) {
    case 'setEmail':
      return {
        ...state,
        email: action.payload
      };
    case 'setOldPassword':
      return {
        ...state,
        oldPassword: action.payload
      };
    case 'setNewPassword':
      return {
        ...state,
        newPassword: action.payload
      };
    case 'setConfirmPassword':
      return {
        ...state,
        confirmPassword: action.payload
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
    case 'setErrorMessage':
      return {
        ...state,
        errorMessage: action.payload
      };
    case 'setOnUpdate':
      return {
        ...state,
        onUpdate: action.payload
      };
    case 'setSeverity':
      return {
        ...state,
        severity: action.payload
      };
  }
};
