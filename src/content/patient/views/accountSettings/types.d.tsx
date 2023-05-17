export interface profileState {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  sex: number;
  age: number;
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

export interface securityInteface {
  email: string;
  password: string;
}

export type securityType = {
  title?: string;
  open?: boolean;
  setIsError?: () => void;
  onClose?: () => void;
  handleOpen?: () => void;
  handleOnClose?: () => void;
  securityResponse?: securityInteface;
  handleOnSubmit?: (
    email: string,
    oldPass: string,
    newPass: string,
    confirmPass: string
  ) => void;
};

export type SnackBarType = {
  isOpen?: boolean;
  handleClose: () => void;
  message?: string;
  severity?: string;
};

export type profileType = {
  handleOnclick?: any;
  user?: profileState;
  isOpen?: boolean;
  emailOpen?: boolean;
  handleOnClose?: () => void;
  handleEmailClose?: () => void;
  handleIsOpen?: () => void;
  handleEmailOpen?: () => void;
  handleUpdateDetails?: (
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    phone: string,
    age: number,
    gender: number,
    address: string
  ) => void;
  handleUpdateEmail?: (email: string) => void;
};

export type modalType = {
  open?: boolean;
  onClose?: () => void;
  type?: string;
  tittle?: string;
  profile?: profileState;
  handleUpdateDetails?: (
    email: string,
    middleName: string,
    lastName: string,
    birthday: string,
    phone: string,
    age: number,
    gender: number,
    address: string
  ) => void;
  handleUpdateEmail?: (email: string) => void;
};

export type SecurityState = {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  isError: boolean;
  errorMessage: string;
  onUpdate: boolean;
  severity: string;
};

export type State = {
  profile: profileState;
  isError: boolean;
  errorMessage: String;
  loading: boolean;
  onUpdate: boolean;
  profileOpen: boolean;
  emailOpen: boolean;
  passOpen: boolean;
};

export type Action =
  | { type: 'setProfile'; payload: profileState }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setOnUpdate'; payload: boolean }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setProfileOpen'; payload: boolean }
  | { type: 'setPassOpen'; payload: boolean }
  | { type: 'setEmailOpen'; payload: boolean };

export type SecurityAction =
  | { type: 'setEmail'; payload: string }
  | { type: 'setOldPassword'; payload: string }
  | { type: 'setNewPassword'; payload: string }
  | { type: 'setConfirmPassword'; payload: string }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setOnUpdate'; payload: boolean }
  | { type: 'setSeverity'; payload: string }
  | { type: 'setErrorMessage'; payload: string };
