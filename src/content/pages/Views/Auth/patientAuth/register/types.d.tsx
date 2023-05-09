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
  | { type: 'setEmail'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setConfirmPassword'; payload: string }
  | { type: 'registerSuccess'; payload: string }
  | { type: 'registerFailed'; payload: string }
  | { type: ''; payload: boolean };
