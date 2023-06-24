import api from 'src/api/api';
import {
  createCreds,
  createResponse,
  deleteResponse,
  subCategory,
  updateCredentials,
  updateResponse
} from 'src/reducers/subCategory/subCategory';

export function fetchAll(): Promise<subCategory> {
  return api.get<subCategory>(`subCategory`).then((res) => res.data);
}

export function create(credentials: createCreds): Promise<createResponse> {
  return api
    .post<createResponse>(`subCategory`, credentials)
    .then((res) => res.data);
}

export function deleteSubCategory(id: number): Promise<deleteResponse> {
  return api
    .delete<deleteResponse>(`subCategory/${id}`)
    .then((res) => res.data);
}

export function updateSubCategory(
  id: number,
  credentials: updateCredentials
): Promise<updateResponse> {
  return api
    .put<updateResponse>(`subCategory/${id}`, credentials)
    .then((res) => res.data);
}
