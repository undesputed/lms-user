import { State } from './types.d';

export const initialState: State = {
  name: '',
  dateOfVisit: new Date(),
  phone: '',
  birthday: new Date(),
  gender: 0,
  address: '',
  companyName: '',
  others: '',
  referredBy: '',
  dateRequested: new Date(),
  selectedCategories: [],
  subCategory: null,
  isError: false,
  errorMessage: '',
  loading: false,
  onUpdate: false,
  profileOpen: false,
  emailOpen: false,
  passOpen: false
};
