export type State = {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string | number;
  gender: string;
  birthDate: Date;
  email: string;
  password: string;
  isError: boolean;
  error: string;
  isButtonDisabled: boolean;
  helperText: string;
};

export type Action = { type: 'setFirstName', payload: string }
| { type: 'setLastName', payload: string}
| { type: 'setUserName', payload: string}
| { type: 'setPhone', payload: string|number}
| { type: 'setGender', payload: string}
| { type: 'setBirthDate', payload: Date}
| { type: 'setEmail', payload: string}
| { type: 'setPassword', payload: string}
| { type: 'setIsButtonDisabled', payload: boolean}
| { type: 'registerSuccess', payload: string}
| { type: 'registerFailed', payload: string}
| { type: 'setIsError', payload: boolean}