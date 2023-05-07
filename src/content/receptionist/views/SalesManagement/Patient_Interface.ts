export interface PatientList {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  email: string;
  emailVerifiedAt: number;
  password: string;
  rememberToken: string;
  exp: number;
  userType: string;
  loginType: string;
  authBy: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
