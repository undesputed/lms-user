import { categoryInterface, subCategoryInterface } from './interface';

export type category = {
  categoryData?: categoryInterface[];
  isError?: boolean;
  isHelperText?: string;
  isLoading?: boolean;
};

export type subCategory = {
  subCategoryData?: subCategoryInterface[];
  isError?: boolean;
  isHelperText?: string;
  isLoading?: boolean;
};

export type Action =
  | { type: 'CATEGORY_FETCH_SUCCESS'; payload: category['categoryData'][] }
  | { type: 'CATEGORY_FETCH_FAILURE'; payload: string; message: string }
  | {
      type: 'SUBCATEGORY_FETCH_SUCCESS';
      payload: subCategory['subCategoryData'][];
    }
  | { type: 'SUBCATEGORY_FETCH_FAILURE'; payload: string; message: string };
