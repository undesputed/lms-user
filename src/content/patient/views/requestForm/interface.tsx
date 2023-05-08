export interface categoryInterface {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface subCategoryInterface {
  id: number;
  category_id: number;
  sub_category_name: string;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

export interface qrCodeInterface {
  value?: string;
  onClick?: () => void;
}