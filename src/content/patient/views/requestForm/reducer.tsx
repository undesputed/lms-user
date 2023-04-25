import { Action, category, subCategory } from './types.d';

export const categoryReducer = (state: category, action: Action): any => {
  switch (action.type) {
    case 'CATEGORY_FETCH_SUCCESS':
      return {
        ...state,
        categoryData: action.payload
      };
    case 'CATEGORY_FETCH_FAILURE':
      return {
        ...state,
        isHelperText: action.payload,
        isError: true
      };
  }
};

export const subCategoryReducer = (state: subCategory, action: Action): any => {
  switch (action.type) {
    case 'SUBCATEGORY_FETCH_SUCCESS':
      return {
        ...state,
        subCategoryData: action.payload
      };
    case 'SUBCATEGORY_FETCH_FAILURE':
      return {
        ...state,
        isHelperText: action.payload,
        isError: true
      };
  }
};
