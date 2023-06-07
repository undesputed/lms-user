import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setName':
      return {
        ...state,
        name: action.payload
      };
    case 'setDateOfVisit':
      return {
        ...state,
        dateOfVisit: new Date(action.payload)
      };
    case 'setPhone':
      return {
        ...state,
        phone: action.payload
      };
    case 'setBirthday':
      return {
        ...state,
        birthday: new Date(action.payload)
      };
    case 'setGender':
      return {
        ...state,
        gender: action.payload
      };
    case 'setAddress':
      return {
        ...state,
        address: action.payload
      };
    case 'setCompanyName':
      return {
        ...state,
        companyName: action.payload
      };
    case 'setOthers':
      return {
        ...state,
        others: action.payload
      };
    case 'setReferred':
      return {
        ...state,
        referredBy: action.payload
      };
    case 'setDateRequested':
      return {
        ...state,
        dateRequested: new Date(action.payload)
      };
    case 'setSelectedCategories':
      return {
        ...state,
        selectedCategories: action.payload
      };
    case 'setSubCategory':
      return {
        ...state,
        subCategory: action.payload
      };
    case 'setCategory':
      return {
        ...state,
        category: action.payload
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
