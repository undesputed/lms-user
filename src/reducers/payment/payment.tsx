export interface PaymentResponse {
  id: number;
  request_form_id: number;
  payment_type: string;
  serial_number: string | null;
  payment_date: Date | string | null;
  status: number;
  authBy: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
}

export interface PaymentCreds {
  request_form_id: number;
  payment_type: string;
  serial_number: string | null;
  payment_date: Date | string;
  status: number;
  authBy: number;
}
