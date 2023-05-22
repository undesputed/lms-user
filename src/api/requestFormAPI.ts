import api from 'src/api/api';

interface RequestFormResponse {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: any;
}

interface requestFormCred {
  authBy: number;
  dateOfVisit: Date;
  status: number;
  user_id: number;
  created_at: Date;
  updated_at: any;
}

export function checkUserRequest(id: number): Promise<RequestFormResponse> {
  return api
    .get<RequestFormResponse>(`requestForm/${id}`)
    .then((res) => res.data);
}

export function retrieveAllUserRequest(
  id: number
): Promise<RequestFormResponse[]> {
  return api
    .get<RequestFormResponse[]>(`requestForm/getAllUserRequest/${id}`)
    .then((res) => res.data);
}

export function createRequestForm(
  credentials: requestFormCred
): Promise<RequestFormResponse> {
  return api
    .post<RequestFormResponse>(`requestForm/`, credentials)
    .then((res) => res.data);
}
