export type State = {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
  loading: boolean;
  success: boolean;
};

export type Action =
  | { type: 'setEmail'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setErrorText'; payload: boolean; message: string }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setSuccess'; payload: boolean };
