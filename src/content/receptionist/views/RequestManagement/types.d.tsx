import { basicInfoFormResponse } from 'src/reducers/requestForm/requestForm';

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
  request: basicInfoFormResponse[];
  onClickViewRequest?: (request_form_id: number) => void;
  onClickApproved?: (request_form_id: number) => void;
};

export type State = {
  request: basicInfoFormResponse[];
  isError: boolean;
  loading: boolean;
  snackBarStatus: boolean;
};

export type Action =
  | { type: 'setRequest'; payload: basicInfoFormResponse[] }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setSnackBarStatus'; payload: boolean };
