import { Action, State } from './types.d';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
    case 'setOpenModal':
      return {
        ...state,
        openModal: action.payload
      };
    case 'setType':
      return {
        ...state,
        type: action.payload
      };
  }
};
