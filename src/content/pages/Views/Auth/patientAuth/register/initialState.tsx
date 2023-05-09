import { State } from './types.d';

export const initialState: State = {
  firstName: '',
  lastName: '',
  middleName: '',
  phone: '',
  address: '',
  sex: 0,
  age: 0,
  birthday: new Date(),
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: false
};
