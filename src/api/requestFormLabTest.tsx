import api from 'src/api/api';

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

export function createRequestFormLabTest(
  credentials: RequestFormLabTestCred
): Promise<RequestFormLabTest> {
  return api
    .post<RequestFormLabTest>(`requestFormLabTest/`, credentials)
    .then((res) => res.data);
}
