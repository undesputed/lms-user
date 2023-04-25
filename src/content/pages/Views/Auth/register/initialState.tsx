import { State } from "./types.d";

export const initialState:State = {
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    gender: '',
    birthDate: new Date,
    email: '',
    password: '',
    isError: false,
    error: '',
    isButtonDisabled: true,
    helperText: ''
};