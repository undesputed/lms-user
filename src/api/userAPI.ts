import api from 'src/api/api';

interface userInterface {
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  username: string | null;
  email: string | null;
  emailVerifiedAt: number;
  password: string | null;
  rememberToken: string | null;
  exp: number | null;
  userType: string | null;
  loginType: string | null;
  authBy: number | null;
  status: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface updateCreds {
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  phone: string;
  age: number;
  gender: number;
  address: string;
}

interface updateEmailResponse {
  id: string;
  email: string;
}

export function retrievePatientById(id: number): Promise<userInterface> {
  return api.get<userInterface>(`user/${id}`).then((res) => res.data);
}

export function updatePatientById(
  id: number,
  data: updateCreds
): Promise<userInterface> {
  return api
    .put<userInterface>(`user/updateDetail/${id}`, data)
    .then((res) => res.data);
}

export function updateEmailPatientById(
  id: number,
  data: {
    email: string;
  }
): Promise<updateEmailResponse> {
  return api
    .put<updateEmailResponse>(`user/updateEmail/${id}`, data)
    .then((res) => res.data);
}
