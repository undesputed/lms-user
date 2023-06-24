export interface category {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

export interface categoryCredentials {
  category_name: string;
}

export interface categoryResponse {
  id: number | string;
  category_name: string;
}

export interface createCredential {
  category_name: string;
  authBy: number;
}

export interface createResponse {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date | string | null;
  updated_at: null;
}
