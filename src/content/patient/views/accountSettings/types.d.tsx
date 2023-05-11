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

export type profileType = {
  handleOnclick?: any;
  user?: any;
};

export type modalType = {
  open?: boolean;
  onClose?: () => void;
  type?: string;
  tittle?: string;
  profile?: profileState;
};

export type State = {
  profile: profileState;
  isError: boolean;
  errorMessage: String;
  loading: boolean;
};

export type Action =
  | { type: 'setProfile'; payload: profileState }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setIsError'; payload: boolean };
