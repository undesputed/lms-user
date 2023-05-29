import api from 'src/api/api';
import {
  BasicInfoResponseById,
  basicInfoFormResponse
} from 'src/reducers/requestForm/requestForm';

interface RequestFormResponse {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  receivedBy: string | null;
  releasedBy: string | null;
  releaseDate: Date | null;
  created_at: Date;
  updated_at: Date | null;
}

interface requestFormCred {
  authBy: number;
  dateOfVisit: Date | string;
  status: number;
  user_id: number;
  created_at: Date | string;
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

export function retrieveAllPendingRequest(): Promise<RequestFormResponse[]> {
  return api
    .get<RequestFormResponse[]>(`/requestForm/pending`)
    .then((res) => res.data);
}

export function retrieveFormByBasicInfo(): Promise<basicInfoFormResponse[]> {
  return api
    .get<basicInfoFormResponse[]>(`/requestForm/basicInfo/`)
    .then((res) => res.data);
}

export function retrieveBasicInfoByFormId(
  id: number
): Promise<BasicInfoResponseById> {
  return api
    .get<BasicInfoResponseById>(`/requestForm/basicInfo/${id}`)
    .then((res) => res.data);
}
