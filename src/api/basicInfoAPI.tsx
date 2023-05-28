import api from 'src/api/api';
import {
  BasicInfoCred,
  BasicInfoResponse
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
