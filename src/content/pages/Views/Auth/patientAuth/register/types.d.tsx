export type State = {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  sex: number;
  age: number;
  birthday: Date;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: boolean;
  errorMessage: string;
  emailExists: boolean;
  emailExistsMessage: string;
  loading: boolean;
  loginSuccess: boolean;
};

export type Action =
  | { type: 'setFirstName'; payload: string }
  | { type: 'setLastName'; payload: string }
  | { type: 'setMiddleName'; payload: string }
  | { type: 'setUserName'; payload: string }
  | { type: 'setPhone'; payload: string }
  | { type: 'setAddress'; payload: string }
  | { type: 'setGender'; payload: number }
  | { type: 'setBirthDate'; payload: Date }
  | { type: 'setAge'; payload: number }
  | { type: 'setEmail'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setConfirmPassword'; payload: string }
  | { type: 'registerSuccess'; payload: string }
  | { type: 'registerFailed'; payload: string }
  | { type: 'setError'; payload: boolean }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setEmailExists'; payload: boolean }
  | { type: 'setEmailExistsMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setLoginSuccess'; payload: boolean };
