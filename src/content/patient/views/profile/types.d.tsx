export interface profileState {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  sex: string;
  age: string;
  birthday: string;
  username: string;
  email: string;
  emailVerifiedAt: string;
  password: string;
  rememberToken: string;
  exp: string;
  userType: string;
  loginType: string;
  authBy: string;
  status: string;
  created_at: string;
  updated_at: null;
}

export interface RequestForm {
  authBy: number;
  created_at: string;
  dateOfVisit: Date;
  id: number;
  status: number;
  updated_at: Date;
  user_id: number;
}

export type CoverType = {
  handleOnclick?: (e: any) => void;
  user?: any;
};

export type State = {
  profile: profileState;
  request: RequestForm[];
  dateOfVisit: Date;
  isError: boolean;
  errorMessage: String;
  loading: boolean;
  snackBarStatus: boolean;
  modalStatus: boolean;
};

export type Action =
  | { type: 'setProfile'; payload: profileState }
  | { type: 'setRequest'; payload: RequestForm[] }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setSnackBarStatus'; payload: boolean }
  | { type: 'setOpenModal'; payload: boolean }
  | { type: 'setDateOfVisit'; payload: Date }
  | { type: 'setIsError'; payload: boolean };
