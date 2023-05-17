import api from 'src/api/api';

interface LoginResponse {
  token: string;
}

interface RegistrationResponse {
  message: string;
}

interface loginCredentials {
  email: string;
  password: string;
}

interface updatePassResponse {
  email: string;
  password: string;
}

interface registrationCredentials {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  username: string;
  email: string;
  password: string;
}

interface updatePasswordCreds {
  email: string;
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

export function patientAuth(
  credentials: loginCredentials
): Promise<LoginResponse> {
  return api
    .post<LoginResponse>('auth/login', credentials)
    .then((response) => response.data);
}

export function patientRegistration(
  credentials: registrationCredentials
): Promise<RegistrationResponse> {
  return api
    .post<RegistrationResponse>('auth/register', credentials)
    .then((res) => res.data);
}

export function patientUpdatePassword(
  credentials: updatePasswordCreds
): Promise<updatePassResponse> {
  return api
    .put<updatePassResponse>('auth/updatePassword', credentials)
    .then((res) => res.data);
}
