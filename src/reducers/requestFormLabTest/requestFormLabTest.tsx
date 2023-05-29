export interface RequestFormLabTest {
  id: number;
  request_form_id: number;
  sub_category_id: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date;
}

export interface RequestFormLabTestCred {
  request_form_id: number;
  sub_category_id: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date;
}

export interface deleteCreds {
  request_form_id: number;
  sub_category_id: number;
}
