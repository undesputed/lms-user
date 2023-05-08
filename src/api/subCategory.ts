import api from 'src/api/api';
import { subCategory } from 'src/reducers/subCategory/subCategory';

export function fetchAll(): Promise<subCategory> {
  return api.get<subCategory>(`subCategory`).then((res) => res.data);
}
