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
  dateOfVisit: Date;
  status: number;
  user_id: number;
  created_at: Date;
  updated_at: any;
}
