import { Action, State } from './types.d';

export const reducer = (state: State, action: Action) => {
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
  }
};
