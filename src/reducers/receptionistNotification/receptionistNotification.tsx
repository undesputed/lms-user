export interface Notification {
  id: number;
  receptionist_id: number;
  patient_request_id: number;
  message: string;
  is_read: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface NotificationCred {
  receptionist_id: number;
  patient_request_id: number;
  message: string;
  is_read: number;
  created_at: Date;
  updated_at: Date | null;
}
