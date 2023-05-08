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

export function retrievePatientById(id: number): Promise<userInterface> {
  return api.get<userInterface>(`user/${id}`).then((res) => res.data);
}
