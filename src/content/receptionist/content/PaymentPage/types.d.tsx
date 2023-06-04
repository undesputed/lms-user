export interface SubCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export interface Category {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export type OptionProps = {
  subCategory: SubCategory[];
  category: Category[];
  onSubmit?: (type: string, serialNumber) => void;
  onCancel?: () => void;
};

export type State = {
  subCategory: SubCategory[];
  category: Category[];
};

export type Action =
  | { type: 'setSubCategory'; payload: SubCategory[] }
  | { type: 'setCategory'; payload: Category[] };
