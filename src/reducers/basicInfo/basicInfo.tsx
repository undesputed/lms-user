export interface BasicInfoResponse {
  id: number;
  name: string;
  dateOfVisit: Date;
  phone: string;
  birthday: Date;
  gender: number;
  address: string;
  companyName: string;
  others: string;
  referredBy: string;
  dateRequested: Date;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface BasicInfoCred {
  name: string;
  dateOfVisit: Date | string;
  phone: string;
  birthday: Date | string;
  gender: number;
  address: string;
  companyName: string;
  others: string;
  referredBy: string;
  dateRequested: Date | string;
  status: number;
  authBy: any;
  created_at: Date | string;
  updated_at: any;
}
