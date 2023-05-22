export interface requestState {
  id: number;
  user_id: number;
  dateOfVisit: Date;
  status: number;
  authBy: number;
  receivedBy: string | null;
  releasedBy: string | null;
  releaseDate: Date | null;
  created_at: Date;
  updated_at: Date | null;
}

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
