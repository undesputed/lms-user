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

export interface createCreds {
  category_id: number;
  sub_category_name: string;
  price: number;
  authBy: number;
}

export interface createResponse {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: null;
}

export interface deleteResponse {
  message: string;
}

export interface updateCredentials {
  sub_category_name: string;
  price: number;
}

export interface updateResponse {
  id: number | string;
  sub_category_name: string;
  price: number;
}
