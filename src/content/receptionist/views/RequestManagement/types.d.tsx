export interface requestState {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  receivedBy: String | null;
  releasedBy: String | null;
  releaseDate: Date;
  created_at: Date;
  updated_at: Date | null;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  sex: number;
  age: number;
  birthday: Date;
}

export type PageHeaderType = {
  onClick?: () => void;
};

export type PageListTableType = {
  request: requestState[];
  onClickViewRequest?: (request_form_id: number) => void;
};

export type State = {
  request: requestState[];
  isError: boolean;
  loading: boolean;
  snackBarStatus: boolean;
};

export type Action =
  | { type: 'setRequest'; payload: requestState[] }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setSnackBarStatus'; payload: boolean };
