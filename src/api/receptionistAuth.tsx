import api from 'src/api/api';

interface RegisterResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

interface LoginCred {
  email: string;
  password: string;
}

export function receptionistAuth(
  credentials: LoginCred
): Promise<LoginResponse> {
  return api
    .post<LoginResponse>(`auth/receptionist/login`, credentials)
    .then((res) => res.data);
}
