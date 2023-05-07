import api from 'src/api/api';

interface LoginResponse {
  token: string;
}

interface loginCredentials {
  email: string;
  password: string;
}

interface registrationCredentials {
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  email: string;
  password: string;
  exp: number;
  userType: string;
  loginType: string;
  status: number;
}

export function patientAuth(
  credentials: loginCredentials
): Promise<LoginResponse> {
  return api
    .post<LoginResponse>('auth/login', credentials)
    .then((response) => response.data);
}
