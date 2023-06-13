import { Action, State } from './types.d';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setBasicInfo':
      return {
        ...state,
        basicInfo: action.payload
      };
    case 'setLabTest':
      return {
        ...state,
        labTest: action.payload
      };
    case 'setPrompt':
      return {
        ...state,
        promptModal: action.payload
      };
    case 'updateBasicInfo':
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          [action.name]: action.value
        }
      };
    case 'setAddLabTest':
      return {
        ...state,
        addLabTest: action.payload
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
  }
};
