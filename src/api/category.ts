import api from 'src/api/api';
import { category } from 'src/reducers/category/category';

export function fetchAll(): Promise<category> {
  return api.get<category>(`category`).then((res) => res.data);
}
