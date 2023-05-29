import api from 'src/api/api';
import { deleteCreds } from 'src/reducers/requestFormLabTest/requestFormLabTest';

interface RequestFormLabTest {
  id: number;
  request_form_id: number;
  sub_category_id: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date;
}

interface RequestFormLabTestCred {
  request_form_id: number;
  sub_category_id: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: Date;
}

interface LabTestResponse {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date | string;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

interface deleteResponse {
  message: string;
}

export function retrieveAllRequestFormLabTest(): Promise<RequestFormLabTest[]> {
  return api
    .get<RequestFormLabTest[]>(`requestFormLabTest`)
    .then((res) => res.data);
}

export function retrieveAllRequestFormLabTestById(
  id: number
): Promise<RequestFormLabTest[]> {
  return api
    .get<RequestFormLabTest[]>(`requestFormLabTest/${id}`)
    .then((res) => res.data);
}

export function retrieveAllLabTestByFormId(
  id: number
): Promise<LabTestResponse[]> {
  return api
    .get<LabTestResponse[]>(`requestFormLabTest/tests/${id}`)
    .then((res) => res.data);
}

export function createRequestFormLabTest(
  credentials: RequestFormLabTestCred
): Promise<RequestFormLabTest> {
  return api
    .post<RequestFormLabTest>(`requestFormLabTest/`, credentials)
    .then((res) => res.data);
}

export function deleteRequestFormLabTest(
  credentials: any
): Promise<deleteResponse> {
  return api
    .delete<deleteResponse>(`requestFormLabTest/`, { data: credentials })
    .then((res) => res.data);
}
