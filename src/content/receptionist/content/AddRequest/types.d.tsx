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

export type StepperType = {
  activeStep?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleReset?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
};

export type BasicInfoProps = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
};

export type LabTestType = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
};

export type FinalFormType = {
  length?: number;
  index?: number;
  handleNext?: () => void;
  handleBack?: () => void;
  handleOnChange?: (e: any) => void;
  subCategory?: subCategory[];
  handleFinish?: () => void;
  handleSubcategoryChange?: (event: any, selectedOptions: any) => void;
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
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setOnUpdate'; payload: boolean }
  | { type: 'setIsError'; payload: boolean }
  | { type: 'setProfileOpen'; payload: boolean }
  | { type: 'setPassOpen'; payload: boolean }
  | { type: 'setEmailOpen'; payload: boolean };
