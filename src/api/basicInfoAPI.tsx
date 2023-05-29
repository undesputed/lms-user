import api from 'src/api/api';
import {
  BasicInfoCred,
  BasicInfoResponse,
  BasicInfoUpdateCred,
  UpdateResponse
} from 'src/reducers/basicInfo/basicInfo';

export function retrieveAllBasicInfo(): Promise<BasicInfoResponse[]> {
  return api.get<BasicInfoResponse[]>(`basicInfo`).then((res) => res.data);
}

export function makeBasicInfo(
  credentials: BasicInfoCred
): Promise<BasicInfoResponse> {
  return api
    .post<BasicInfoResponse>(`basicInfo`, credentials)
    .then((res) => res.data);
}

export function updateBasicInfo(
  credentials: BasicInfoUpdateCred
): Promise<UpdateResponse> {
  return api
    .put<UpdateResponse>(`basicInfo/${credentials.id}`, credentials)
    .then((res) => res.data);
}
