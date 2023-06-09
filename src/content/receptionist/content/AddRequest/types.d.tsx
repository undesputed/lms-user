interface subCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

interface category {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export type LabTestModalProps = {
  open?: boolean;
  title?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
  category?: category[];
  subCategory?: subCategory[];
  onSelectSubCat?: (e: any, id: number) => void;
  handleSelectCat?: (e: any, id: number) => void;
  onDelete?: (e: any, id: number) => void;
};

export type StepperType = {
  activeStep?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleReset?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  category?: category[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
  handleSelectCat?: (e: any, id: number) => void;
  handleSubmit?: () => void;
  selected?: number[];
  onDelete?: (e: any, id: number) => void;
};

export type BasicInfoProps = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  category?: category[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
  handleSelectCat?: (e: any, id: number) => void;
  handleSubmit?: () => void;
  selected?: number[];
  onDelete?: (e: any, id: number) => void;
};

export type LabTestType = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  category?: category[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
  handleSelectCat?: (e: any, id: number) => void;
  handleSubmit?: () => void;
  selected?: number[];
  onDelete?: (e: any, id: number) => void;
};

export type FinalFormType = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  category?: category[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
  handleSelectCat?: (e: any, id: number) => void;
  handleSubmit?: () => void;
  selected?: number[];
  onDelete?: (e: any, id: number) => void;
};

export type State = {
  name: string;
  dateOfVisit: Date | string;
  phone: string;
  birthday: Date | string;
  gender: number;
  address: string;
  companyName: string;
  others: string;
  referredBy: string;
  dateRequested: Date | string;
  selectedCategories: [];
  subCategory: subCategory[];
  category?: category[];
  isError: boolean;
  errorMessage: String;
  loading: boolean;
  onUpdate: boolean;
  profileOpen: boolean;
  emailOpen: boolean;
  passOpen: boolean;
};

export type Action =
  | { type: 'setName'; payload: string }
  | { type: 'setDateOfVisit'; payload: Date }
  | { type: 'setPhone'; payload: string }
  | { type: 'setBirthday'; payload: Date }
  | { type: 'setGender'; payload: number }
  | { type: 'setAddress'; payload: string }
  | { type: 'setCompanyName'; payload: string }
  | { type: 'setOthers'; payload: string }
  | { type: 'setReferred'; payload: string }
  | { type: 'setDateRequested'; payload: Date }
  | { type: 'setSelectedCategories'; payload: [] }
  | { type: 'setSubCategory'; payload: subCategory[] }
  | { type: 'setCategory'; payload: category[] }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setOnUpdate'; payload: boolean }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setProfileOpen'; payload: boolean }
  | { type: 'setPassOpen'; payload: boolean }
  | { type: 'setEmailOpen'; payload: boolean };
