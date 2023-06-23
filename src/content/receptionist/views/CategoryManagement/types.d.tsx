export interface subCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

export interface category {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export type ModalProps = {
  open?: boolean;
  title?: string;
  type?: string;
  handleClose?: () => void;
  handleSubmit?: (id: number | undefined) => void;
};

export type State = {
  category: category[];
  subCategory: subCategory[];
  openModal: boolean;
  type: string;
  value: string;
  id: number;
  price: number;
};

export type Action =
  | { type: 'setSubCategory'; payload: subCategory[] }
  | { type: 'setCategory'; payload: category[] }
  | { type: 'setOpenModal'; payload: boolean }
  | { type: 'setType'; payload: string }
  | { type: 'setValue'; payload: string }
  | { type: 'setId'; payload: number }
  | { type: 'setPrice'; payload: number };
