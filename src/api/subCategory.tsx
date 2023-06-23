import api from 'src/api/api';
import {
  createCreds,
  createResponse,
  subCategory
} from 'src/reducers/subCategory/subCategory';

export function fetchAll(): Promise<subCategory> {
  return api.get<subCategory>(`subCategory`).then((res) => res.data);
}

export function create(credentials: createCreds): Promise<createResponse> {
  return api
    .post<createResponse>(`subCategory`, credentials)
    .then((res) => res.data);
}
