import api from 'src/api/api';
import {
  category,
  categoryCredentials,
  categoryResponse,
  createCredential,
  createResponse
} from 'src/reducers/category/category';

export function fetchAll(): Promise<category> {
  return api.get<category>(`category`).then((res) => res.data);
}

export function updateCategory(
  id: number,
  credential: categoryCredentials
): Promise<categoryResponse> {
  return api
    .put<categoryResponse>(`category/${id}`, credential)
    .then((res) => res.data);
}

export function createCategory(
  credential: createCredential
): Promise<createResponse> {
  return api
    .post<createResponse>(`category`, credential)
    .then((res) => res.data);
}
