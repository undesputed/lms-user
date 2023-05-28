export interface RequestForm {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date;
}

export interface requestFormCred {
  authBy: number;
  dateOfVisit: Date | string;
  status: number;
  user_id: number;
  created_at: Date | string;
  updated_at: any;
}

export interface basicInfoFormResponse {
  id: number;
  basic_info_id: number;
  user_id: number;
  dateOfVisit: Date | string;
  status: number;
  authBy: number;
  receivedBy: any;
  releasedBy: any;
  releaseDate: any;
  created_at: Date | string;
  updated_at: any;
  name: string;
  phone: number | string;
  birthday: Date | string;
  gender: number;
  address: string;
  companyName: string;
  others: string;
  referredBy: string;
  dateRequested: Date | string;
}
